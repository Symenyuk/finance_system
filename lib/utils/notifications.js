'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const billStatus = require('../../config/config').billStatus;
const notifications = global.config.notifications;
const moment = require('moment');
moment().format();

const checkBills = (req, res) => {
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;
    const alertDays = notifications.bills_days;

    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;
    let filterInterval = req.query.interval;
    let selectField;
    let where;

    // check review interval (from sent(21) -> approved(60))
    if (filterInterval === 'review_interval') {
        selectField = `bills.id, bills.bill_key, bills.status, agreements.review_interval, agreements.transaction_interval, bills.created_at, billhistory.updated_at`;
        where = `INNER JOIN agreements ON bills.agreement = agreements.id
                 INNER JOIN billhistory ON bills.bill_key = billhistory.bill_key AND billhistory.status = ${billStatus('sent')}
                 WHERE bills.insurance = ${insurance} 
                 AND bills.status IN (
                    ${billStatus('sent')},
                    ${billStatus('checked3')},
                    ${billStatus('dispute')},
                    ${billStatus('dispute_verified')},
                    ${billStatus('dispute_checked')},
                    ${billStatus('dispute_approved')},
                    ${billStatus('dispute_concerned')},
                    ${billStatus('dispute_cancel')},
                    ${billStatus('terminated')}
                 )`;
    }

    // check payment interval (from approved(60) -> payed(70))
    else if (filterInterval === 'payment_interval') {
        selectField = `bills.id, bills.bill_key, bills.status, agreements.payment_interval, bills.created_at, billhistory.updated_at`;
        where = `INNER JOIN agreements ON bills.agreement = agreements.id
                 INNER JOIN billhistory ON bills.bill_key = billhistory.bill_key AND billhistory.status = ${billStatus('approved')}
                 WHERE bills.insurance = ${insurance} 
                 AND bills.status IN (${billStatus('approved')}, ${billStatus('pending_payment')})`;

    // check charges interval (from payed(70) -> fee received(91))
    } else if (filterInterval === 'charges') {
        selectField = `bills.id, bills.bill_key, bills.status, agreements.charges, bills.created_at, billhistory.updated_at`;
        where = `INNER JOIN agreements ON bills.agreement = agreements.id 
                 INNER JOIN billhistory ON bills.bill_key = billhistory.bill_key AND billhistory.status = ${billStatus('payed')}
                 WHERE bills.hospital = ${hospital} 
                 AND bills.status IN (${billStatus('payed')}, ${billStatus('received')}, ${billStatus('fee_payed')})`;
    }

    if (filterInterval !== undefined) {
        db.serialize(() => {

            db.all(`SELECT DISTINCT ${selectField} FROM bills ${where}`, (err, bills) => {
                if (err) {
                    res.status(500).json({message: 'Server error'});
                } else if (!bills) {
                    res.status(200).json({'count': 0, 'list': []});
                }

                let filterBills = bills.filter(function (item) {
                    let endOfPeriod = (Number(item.transaction_interval) === 7) ?
                        moment(item.created_at).endOf('week') :
                        moment(item.created_at).endOf('month');
                    item.end_of_period = endOfPeriod;

                    return moment().isAfter(endOfPeriod);
                });
                let result = filterBills.filter(item => {
                    let relativeDate;
                    if (filterInterval === 'review_interval') {
                        let startDayReviewInterval;
                        if (item.end_of_period.isAfter(moment(item.updated_at))) {
                            startDayReviewInterval = item.end_of_period;
                        } else {
                            startDayReviewInterval = moment(item.updated_at);
                        }
                        relativeDate = moment(startDayReviewInterval).add(Number(item[filterInterval]), 'days').subtract(Number(alertDays), 'days');
                        return moment().isAfter(relativeDate);
                    } else {
                        relativeDate = moment(item.updated_at).add(Number(item[filterInterval]), 'days').subtract(Number(alertDays), 'days');
                        return moment().isAfter(relativeDate);
                    }
                });

                if (result.length) {
                    let limitedData = result.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : result.length);
                    res.status(200).send({'count': result.length, 'list': limitedData});
                } else {
                    res.status(200).json({'count': 0, 'list': []});
                }
            });
        });
    } else {
        log.error(`Error. None all params for checkBills`);
        res.status(422).send({message: `Error. None all params for checkBills`});
    }
}

const checkInvoices = (req, res) => {
    const hospital = req.decoded.hospital;
    const alertDays = notifications.invoices_days;
    let orderBy = req.query.order_by ? `ORDER BY invoices.${req.query.order_by}` : ``;

    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    db.serialize(() => {
        db.all(`SELECT DISTINCT agreements.delay_penalty, insurance.name as insurance_name, invoices.*
                FROM invoices
                INNER JOIN agreements ON agreements.id = invoices.agreement
                INNER JOIN insurance ON insurance.id = invoices.insurance
                WHERE invoices.hospital = ? AND invoices.status = 0 ${orderBy}`, [hospital], (err, invoices) => {
            if (err) {
                log.error(`checkInvoice, ${err}`);
                res.status(500).json({message: 'Server error'});
            } else if (!invoices) {
                res.status(200).json({'count': 0, 'list': []});
            }

            let result = invoices.filter(function (item) {
                let delay = Number(item.delay_penalty);
                let created = Number(item.created_at);
                let relativeDate = moment.utc(created).add(delay, 'days').subtract(Number(alertDays), 'days');
                return moment().isAfter(relativeDate);
            });

            if (result.length) {
                let limitedData = result.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : result.length);
                res.status(200).send({'count': invoices.length, 'list': limitedData});
            } else {
                res.status(200).json({'count': 0, 'list': []});
            }
        });
    });
}

module.exports = {
    checkBills,
    checkInvoices
}
