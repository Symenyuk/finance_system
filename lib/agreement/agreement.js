'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const roles = require('../../config/config').role;

const createAgreement = (req, res) => {
    let hospital = req.body.hospital;
    let insurance = req.body.insurance;

    let transaction_interval = req.body.transaction_interval;
    let review_interval = req.body.review_interval;
    let payment_interval = req.body.payment_interval;
    let charges = req.body.charges;

    let transaction_charges_per_bill = req.body.transaction_charges_per_bill;
    let delay_penalty = req.body.delay_penalty;
    let discount_rate = req.body.discount_rate;
    let status = 1; // 1 - active, 0 - Freeze
    let owner = req.decoded.userLogin;
    let created_at = Date.now();
    let updated_at = Date.now();

    if (hospital && insurance && transaction_interval && review_interval && payment_interval && charges && transaction_charges_per_bill && owner) {
        db.serialize(() => {

            // checking if agreement exist
            db.get(`SELECT * FROM agreements WHERE hospital = ? AND insurance = ?`, hospital, insurance, (err, data) => {
                if (err) {
                    log.error(`err ${err}`);
                    res.status(500).send({message: 'Server error!'})
                }
                if (data) {
                    res.status(409).send({message: 'Agreement already exists'});
                } else {
                    let data = [hospital, insurance, transaction_interval, review_interval, payment_interval, charges, transaction_charges_per_bill,
                        delay_penalty, discount_rate, status, owner, created_at, updated_at];

                    let stmt = db.prepare(`INSERT INTO agreements
                                       (hospital, insurance, transaction_interval, review_interval, payment_interval,
                                       charges, transaction_charges_per_bill,
                                       delay_penalty, discount_rate, status, owner, created_at, updated_at)
                                       VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

                    stmt.run(data, (err) => {
                        if (err) {
                            log.error(`createAgreement. ${err}`);
                            res.status(500).send({message: 'Server error'})
                        }
                        res.status(200).send({message: 'Success'});
                    });
                    stmt.finalize();
                }
            });
        });
    } else {
        log.error(`Error. None all params for createAgreement`);
        res.status(422).send({message: `Error. None all params for createAgreement`});
    }
}

const changeAgreementOwner = (req, res) => {
    const id = req.params.id;
    const owner = req.body.owner;

    if (id && owner) {
        db.serialize(() => {
            db.run(`UPDATE agreements SET owner = ? WHERE id = ?`, owner, id, (err) => {
                if (err) {
                    log.error(`changeAgreementOwner. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. None all params for changeAgreementOwner`);
        res.status(422).send({message: `Error. None all params for changeAgreementOwner`});
    }
}

const getAllAgreements = (req, res) => {
    const owner = req.decoded.userLogin;
    const role = req.decoded.userRole;
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;

    const filterHospital = req.query.hospital ? `AND hospitals.name LIKE '%${req.query.hospital}%'` : ``;
    const filterInsurances = req.query.insurance ? `AND insurance.name LIKE '%${req.query.insurance}%'` : ``;
    const filterOwner = req.query.manager ? `AND agreements.owner LIKE '%${req.query.manager}%'` : ``;
    let filterDate = req.query.date;
    if (filterDate !== undefined) {
        if (filterDate === '7') filterDate = " AND (agreements.created_at + 604800) > CAST(strftime('%s', 'now') AS INT)";
        if (filterDate === '30') filterDate = " AND (agreements.created_at + 2592000) > CAST(strftime('%s', 'now') AS INT)";
    } else {
        filterDate = ``;
    }
    let orderBy = req.query.order_by ? `ORDER BY agreements.${req.query.order_by}` : ``;
    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    if (owner && role) {
        let select = ``;
        let where = ``;
        switch (role) {
            // Admin
            case roles('superAdmin'):
                select = `hospitals.contact_person_name as hospital_contact_person, hospitals.name as hospital_name, 
                          insurance.contact_person as insurance_contact_person, insurance.name as insurance_name,
                          agreements.id, agreements.hospital, agreements.insurance, agreements.owner, agreements.created_at, 
                          agreements.payment_interval, agreements.delay_penalty, agreements.discount_rate, agreements.status`;
                where = `agreements.id NOT IN ('null')`;
                break;
            case roles('accountManager'):
                select = `hospitals.contact_person_name as hospital_contact_person, hospitals.name as hospital_name, 
                          insurance.contact_person as insurance_contact_person, insurance.name as insurance_name,
                          agreements.id, agreements.hospital, agreements.insurance, agreements.owner, agreements.created_at, 
                          agreements.payment_interval, agreements.delay_penalty, agreements.discount_rate, agreements.status`;
                where = `agreements.owner = '${owner}'`;
                break;

            // Hospital
            case roles('adminHospital'):
            case roles('teller'):
            case roles('financeHospital'):
            case roles('financeManagerHospital'):
                select = `hospitals.contact_person_name as hospital_contact_person, hospitals.name as hospital_name, 
                          insurance.contact_person as insurance_contact_person, insurance.name as insurance_name,
                          agreements.id, agreements.insurance, agreements.created_at, agreements.payment_interval, agreements.delay_penalty, 
                          agreements.discount_rate, agreements.transaction_interval, agreements.owner`;
                where = `agreements.hospital = ${hospital}`;
                break;

            // Insurance
            case roles('adminInsurance'):
            case roles('audit'):
            case roles('auditManagerInsurance'):
            case roles('financeManagerInsurance'):
                select = `hospitals.contact_person_name as hospital_contact_person, hospitals.name as hospital_name, 
                          insurance.contact_person as insurance_contact_person, insurance.name as insurance_name,
                          agreements.id, agreements.hospital, agreements.created_at, agreements.payment_interval, agreements.delay_penalty, 
                          agreements.discount_rate, agreements.owner`;
                where = `agreements.insurance = ${insurance}`;
                break;
        }

        db.serialize(() => {
            db.all(`SELECT ${select} FROM agreements
                    INNER JOIN hospitals ON hospitals.id = agreements.hospital
                    INNER JOIN insurance ON insurance.id = agreements.insurance 
                    WHERE ${where}
                    ${filterHospital} 
                    ${filterInsurances} 
                    ${filterOwner}
                    ${filterDate}
                    ${orderBy}`, (err, data) => {
                if (err) {
                    log.error(`getAllAgreements. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getAllAgreements`);
        res.status(422).send({message: `Error. None all params for getAllAgreements`});
    }
}

const getAgreement = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.get(`SELECT agreements. *,
                    hospitals.contact_person_name as hospital_contact_person, 
                    hospitals.name as hospital_name,
                    insurance.contact_person as insurance_contact_person, 
                    insurance.name as insurance_name 
                    FROM agreements 
                    INNER JOIN hospitals ON hospitals.id = agreements.hospital 
                    INNER JOIN insurance ON insurance.id = agreements.insurance 
                    WHERE agreements.id = ?`, id, (err, data) => {
                if (err) {
                    log.error(`getAgreement. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. Need 'id' param for getAgreement`);
        res.status(422).send({message: `Error. Need 'id' param for getAgreement`});
    }
}

const getAgreementByCounterparties = (req, res) => {
    let hospital = req.query.hospital;
    let insurance = req.query.insurance;

    if (hospital && insurance) {
        db.serialize(() => {
            db.get(`SELECT agreements.created_at, agreements.transaction_interval FROM agreements WHERE agreements.hospital = ? AND agreements.insurance = ?`, hospital, insurance, (err, data) => {
                if (err) {
                    log.error(`getAgreementByCounterparties. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getAgreementByCounterparties`);
        res.status(422).send({message: `Error. None all params for getAgreementByCounterparties`});
    }
}

const editAgreement = (req, res) => {
    let id = req.params.id;

    let transaction_interval = req.body.transaction_interval;
    let review_interval = req.body.review_interval;
    let payment_interval = req.body.payment_interval;
    let charges = req.body.charges;
    let transaction_charges_per_bill = req.body.transaction_charges_per_bill;
    let delay_penalty = req.body.delay_penalty;
    let discount_rate = req.body.discount_rate;
    let updated_at = Date.now();

    if (id && transaction_interval && review_interval && payment_interval && charges && transaction_charges_per_bill) {
        db.serialize(() => {
            db.run(`UPDATE agreements SET transaction_interval = ?, review_interval = ?, payment_interval = ?, 
                    charges = ?, transaction_charges_per_bill = ?, delay_penalty = ?, discount_rate = ?, updated_at = ? 
                    WHERE id = ?`, transaction_interval, review_interval, payment_interval, charges,
                transaction_charges_per_bill, delay_penalty, discount_rate, updated_at, id, (err) => {
                if (err) {
                    log.error(`editAgreement. ${err}`);
                    res.status(500).send({message: 'Server error!'})
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. Need 'id' param for editAgreement`);
        res.status(422).send({message: `Error. Need 'id' param for editAgreement`});
    }
}

// Freeze (0) || UNFreez (1)
const renewAgreement = (req, res) => {
    let id = req.params.id;
    let status = req.body.status;

    if (id && status !== undefined) {
        db.serialize(() => {
            db.run(`UPDATE agreements SET status = ? WHERE id = ?`, [status, id], (err) => {
                if (err) {
                    log.error(`renewAgreement. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. None all params for renewAgreement`);
        res.status(422).send({message: `Error. None all params for renewAgreement`});
    }
}


module.exports = {
    createAgreement,
    changeAgreementOwner,
    getAllAgreements,
    getAgreement,
    getAgreementByCounterparties,
    editAgreement,
    renewAgreement
}