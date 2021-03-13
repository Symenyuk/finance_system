'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const moment = require('moment');
moment().format();
moment.updateLocale('en', {
    week: {
        dow: 1
    }
});

const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

let options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    header: {
        height: '45mm',
        contents: '<div style="text-align: center;">Blockchain Financial Systems</div>'
    },
    type: 'pdf'
};

const checkCreateInvoice = () => {
    db.serialize(() => {
        db.all(`SELECT id, hospital, insurance, 
                        transaction_interval, review_interval, payment_interval, transaction_charges_per_bill, created_at
                        FROM agreements`, (err, agreements) => {

            if (err) {
                log.error(`invoice, ${err}`);
            }

            for (let i = 0; i < agreements.length; i++) {
                let agreement = agreements[i].id;
                let hospital = agreements[i].hospital;
                let insurance = agreements[i].insurance;
                let interval = agreements[i].transaction_interval;
                let review_interval = Number(agreements[i].review_interval);
                let payment_interval = Number(agreements[i].payment_interval);
                let cost = agreements[i].transaction_charges_per_bill;
                let agreementCreatedAt = moment.utc(+new Date(agreements[i].created_at));
                let dateFrom;
                let dateTo;

                let createInvoice = (firstInvoice, dateFromBill, dateToBill) => {
                    if (firstInvoice !== true) {
                        dateFrom = +moment.utc(dateFromBill).format('x');
                        dateTo = +moment.utc(dateToBill).format('x');
                    } else {
                        dateFrom = Number(agreements[i].created_at);
                        let period = interval === 7 ? 'week' : 'month';
                        dateTo = +moment.utc(agreements[i].created_at).endOf(period);
                    }

                    if (dateFrom !== undefined && dateTo !== undefined) {
                        db.get(`SELECT count(*) as countBills FROM bills WHERE hospital = ?
                                        AND created_at >= ${dateFrom} AND created_at <= ${dateTo}`, [hospital], (err, data) => {
                            if (err) {
                                log.error(`invoice, ${err}`);
                            }
                            let numberOfBills = data.countBills || 0;
                            let amount = Number(cost) * Number(numberOfBills);
                            let status = 0;

                            if (agreement) {
                                db.serialize(() => {
                                    let data = [agreement, hospital, insurance, interval, status, cost, numberOfBills, amount,
                                        dateFrom, dateTo, +moment.utc(dateTo).add(review_interval, 'days').add(payment_interval, 'days').format("x")];
                                    let stmt = db.prepare(`INSERT INTO invoices
                                                    (agreement, hospital, insurance, interval, status, cost, number_of_bills, amount, date_from, date_to, created_at)
                                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                                    stmt.run(data, (err) => {
                                        if (err) {
                                            log.error(`Insert invoice, ${err}`);
                                        }
                                        log.info(`Success. Invoice created!`);
                                    });
                                    stmt.finalize();
                                });
                            } else {
                                log.error(`Error. None all params for createInvoice`);
                            }
                        });
                    } else {
                        log.error('createInvoice error');
                    }
                }

                if (interval !== undefined) {
                    db.get(`SELECT agreement, hospital, insurance, date_from, date_to, created_at
                                        FROM invoices
                                        WHERE hospital = ? AND insurance = ? AND agreement = ? ORDER BY created_at DESC LIMIT 1`, [hospital, insurance, agreement], (err, data) => {
                        if (err) {
                            log.error(`Check availability invoice, ${err}`);
                        } else if (!data) {
                            // first invoice
                            let lastDate = interval === 7 ? agreementCreatedAt.endOf('week') : agreementCreatedAt.endOf('month');
                            let dateCreateInvoice = moment.utc(lastDate).add(review_interval, 'days').add(payment_interval, 'days');

                            if (moment() >= dateCreateInvoice) {
                                createInvoice(true);
                            }
                        } else {
                            if (data) {
                                let nextInvoice = interval === 7 ? moment.utc(data.created_at).add(1, 'week') :
                                    moment.utc(data.created_at).add(1, 'month');
                                let dateToInvoice = interval === 7 ? moment.utc(data.date_to).add(1, 'week') :
                                    moment.utc(data.date_to).add(1, 'month');

                                if (moment() >= nextInvoice) {
                                    createInvoice(
                                        false,
                                        moment.utc(data.date_to).add(1, 'second'),
                                        dateToInvoice);
                                }
                            }
                        }
                    });
                }
            }
        });
    });
}

const getInvoices = (req, res) => {
    const hospital = req.decoded.hospital;
    const filterHospital = req.query.hospital ? `WHERE hospital = ${req.query.hospital}` : ``;
    let orderBy = req.query.order_by ? `ORDER BY invoices.${req.query.order_by}` : ``;

    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    let filterFrom = req.query.from ? `AND invoices.created_at >= ${moment(req.query.from).format("x")}` : ``;
    let filterTo = req.query.to ? `AND invoices.created_at <= ${moment(req.query.to)
        .add(23, 'hours')
        .add(59, 'minutes')
        .add(59, 'seconds')
        .format("x")}` : ``;

    let where = ``;
    if (hospital) {
        where = `WHERE hospital = ${hospital}`
    }
    db.serialize(() => {
        db.all(`SELECT insurance.name as insurance_name, hospitals.name as hospital_name, invoices.*
                FROM invoices
                INNER JOIN hospitals ON hospitals.id = invoices.hospital
                INNER JOIN insurance ON insurance.id = invoices.insurance ${where} ${filterHospital} ${filterFrom} ${filterTo} ${orderBy}`, (err, data) => {
            if (err) {
                log.error(`getInvoices, ${err}`);
                res.status(500).json({message: 'Server error'});
            } else if (!data) {
            } else if (!data) {
                res.status(200).json({'count': 0, 'list': []});
            }
            let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);

            res.status(200).send({'count': data.length, 'list': limitedData});
        });
    });
}

// created (0) || paid (1) || received (2)
const changeInvoiceStatus = (req, res) => {
    let id = req.params.id;
    let status = req.body.status;

    if (id && status !== undefined) {
        db.serialize(() => {
            db.run(`UPDATE invoices SET status = ? WHERE id = ?`, [status, id], (err) => {
                if (err) {
                    log.error(`changeStatusInvoice. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. None all params for changeStatusInvoice`);
        res.status(422).send({message: `Error. None all params for changeStatusInvoice`});
    }
}

const exportInvoice = (req, res) => {
    let invoices = req.query.invoices;
    let invoicesData = [];
    let totalData = [];
    let infoData = [];
    let resultData = [];
    let len = invoices.length;

    for (let id of invoices) {
        db.serialize(() => {
            db.get(`SELECT insurance.name as insurance_name, hospitals.name as hospital_name, invoices.*
                FROM invoices
                INNER JOIN hospitals ON hospitals.id = invoices.hospital
                INNER JOIN insurance ON insurance.id = invoices.insurance 
                WHERE invoices.id = ?`, [id], (err, data) => {
                if (err) {
                    log.error(`getInvoices, ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }

                invoicesData.push(data);

                if (--len <= 0) {
                    infoData.push({'hospital_name': data.hospital_name});
                    let total_number_of_bills = 0;
                    let total_amount = 0;
                    let arrayDateFrom = [];
                    let arrayDateTo = [];
                    for (let invoice of invoicesData) {
                        total_number_of_bills += Number(invoice.number_of_bills);
                        total_amount += Number(invoice.amount);
                        arrayDateFrom.push(invoice.date_from);
                        arrayDateTo.push(invoice.date_to);
                    }
                    let min = Math.min(...arrayDateFrom);
                    let max = Math.max(...arrayDateTo);

                    infoData.push({'from': min}, {'to': max});
                    totalData.push({'total_number_of_bills': total_number_of_bills, 'total_amount': total_amount});
                    resultData.push(invoicesData);
                    resultData.push(totalData);
                    resultData.push(infoData);
                    ejs.renderFile(__dirname + '/invoice-template.ejs', {
                        moment: moment,
                        invoices: resultData
                    }, function (err, data) {
                        if (err) {
                            log.error(err);
                            res.status(500).send(err);
                        } else {
                            pdf.create(data, options).toFile('invoices_reports/invoice-report.pdf', (err) => {
                                if (err) {
                                    log.error(`invoice pdf create, ${err}`);
                                    res.status(500).send({message: 'Server error'});
                                }
                                res.status(200).sendFile(path.join(__dirname, '../../invoices_reports/invoice-report.pdf'));
                            });
                        }
                    });
                }
            });
        });
    }
}

setInterval(() => checkCreateInvoice(), 3600000); // every 1 hour

module.exports = {
    checkCreateInvoice,
    getInvoices,
    changeInvoiceStatus,
    exportInvoice
}
