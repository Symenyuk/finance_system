'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const roles = require('../../config/config').role;

const createInsurance = (req, res) => {
    const name = req.body.name;
    const contact_person = req.body.contact;
    const zip_code = req.body.zip_code;

    const owner = req.decoded.userLogin;
    const admin = null;

    const region = req.body.region;
    const city = req.body.city;
    const district = req.body.district;
    const street = req.body.street;
    const address = req.body.building;

    const email = req.body.email;
    const tel = req.body.tel;
    const mobile = req.body.mobile;

    const extension = req.body.extension;

    const created_at = Date.now();
    const updated_at = Date.now();
    if (name && contact_person && zip_code && region && street && address && tel && mobile) {
        db.serialize(() => {
            let data = [name, contact_person, zip_code, owner, admin, region, city, district, street, address, email, tel, mobile, extension, created_at, updated_at];
            let stmt = db.prepare(`INSERT INTO insurance(
                               name, contact_person, zip_code, owner, admin, region, city, district, street, address, email, tel, mobile, extension, created_at, updated_at)
                               VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(data, (err) => {
                if (err) {
                    log.error(`createInsurance. ${err}`);
                    res.status(500).send({message: 'Server error'});
                }
                res.status(200).send({message: 'Success'});
            });
            stmt.finalize();
        });
    } else {
        log.error(`Error. None all params for createInsurance`);
        res.status(422).send({message: `Error. None all params for createInsurance`});
    }
}


const changeAdminInsurance = (req, res) => {
    let id = req.params.id;
    const admin = req.body.admin; // login

    if (id && admin) {
        db.serialize(() => {
            db.run('begin transaction');
            db.get(`SELECT id FROM users WHERE insurance = ?`, id, (err, data) => {
                if (err) {
                    log.error(`changeAdminInsurance. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                if (data) {
                    db.run(`UPDATE users SET insurance = ? WHERE id = ?`, [null, data.id], (err) => {
                        if (err) {
                            log.error(`changeAdminInsurance. ${err}`);
                            res.status(500).send({message: 'Server error!'});
                        }
                    });
                }
            });

            db.run(`UPDATE insurance SET admin = ? WHERE id = ?`, [admin, id], (err) => {
                if (err) {
                    log.error(`changeAdminInsurance. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
            });

            db.run(`UPDATE users SET insurance = ? WHERE login = ?`, [id, admin], (err) => {
                if (err) {
                    log.error(`changeAdminInsurance. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
            });

            db.run('commit');
            res.status(200).send({message: 'Success'});
        });
    } else {
        log.error(`Error. None all params for changeAdminInsurance`);
        res.status(422).send({message: `Error. None all params for changeAdminInsurance`});
    }
}


const getAllInsurance = (req, res) => {
    const owner = req.decoded.userLogin;
    const role = req.decoded.userRole;
    let orderBy = req.query.order_by ? `ORDER BY ${req.query.order_by}` : ``;
    let filterName = req.query.name ? `AND name LIKE '${req.query.name}%'` : ``;
    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    if (owner && role) {
        let where = ``;
        if (role !== roles('superAdmin') && role !== roles('financeManager')) {
            where = `AND owner = '${owner}'`;
        }
        db.serialize(() => {
            db.all(`SELECT * FROM insurance WHERE id NOT IN ('null') ${where} ${filterName} ${orderBy}`, (err, data) => {
                if (err) {
                    log.error(`getAllInsurance. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getAllInsurance`);
        res.status(422).send({message: `Error. None all params for getAllInsurance`});
    }
}

const getConnectedHospitals = (req, res) => {
    const insurance = req.decoded.insurance;

    if (insurance) {
        db.serialize(() => {
            db.all(`SELECT hospitals.*, agreements.created_at as agreement_created, agreements.transaction_interval as agreement_interval FROM hospitals LEFT JOIN agreements ON agreements.hospital = hospitals.id AND agreements.insurance = ? WHERE hospitals.id IN (SELECT hospital FROM agreements WHERE insurance = ?)`, insurance, insurance, (err, data) => {
                if (err) {
                    log.error(`getConnectedHospitals, ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getConnectedHospitals`);
        res.status(422).send({message: `Error. None all params for getConnectedHospitals`});
    }
}

const getInsurance = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.get(`SELECT * FROM insurance WHERE id = ?`, [id], (err, data) => {
                if (err) {
                    log.error(`getInsurance. ${err}`);
                    res.status(500).json({message: 'Server error', err});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. Need 'id' param for for getInsurance`);
        res.status(422).send({message: `Error. Need 'id' param for for getInsurance`});
    }
}

const editInsurance = (req, res) => {
    let id = req.params.id;

    const name = req.body.name;
    const contact_person = req.body.contact;
    const zip_code = req.body.zip_code;

    const region = req.body.region;
    const city = req.body.city;
    const district = req.body.district;

    const street = req.body.street;
    const address = req.body.building; // TODO: change (address)

    const email = req.body.email;
    const tel = req.body.tel;
    const mobile = req.body.mobile;

    const extension = req.body.extension;
    const updated_at = Date.now();

    if (id && name && contact_person && zip_code && region && street && address && tel && mobile) {
        db.run(`UPDATE insurance SET name = ?, contact_person = ?, zip_code = ?, region = ?, city = ?, district = ?, street = ?, 
        address = ?, email = ?, tel = ?, mobile = ?, extension = ?, updated_at = ?
            WHERE id = ?`,
            [name, contact_person, zip_code, region, city, district, street, address, email, tel, mobile, extension, updated_at, id], (err) => {
                if (err) {
                    log.error(`editInsurance. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
    } else {
        log.error(`Error. Need 'id' param for editInsurance`);
        res.status(422).send({message: `Error. Need 'id' param for editInsurance`});
    }
}

const deleteInsurance = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.run(`DELETE FROM insurance WHERE id = ?`, id, (err) => {
                if (err) {
                    log.error(`deleteInsurance. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                db.run(`UPDATE users SET insurance = ? WHERE insurance = ?`, null, id, (err) => {
                    if (err) {
                        log.error(`deleteInsurance. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    res.status(200).send({message: 'Success'});
                })
            });
        });
    } else {
        log.error(`Error. Need 'id' param for deleteInsurance`);
        res.status(422).send({message: `Error. Need 'id' param for deleteInsurance`});
    }
}


module.exports = {
    createInsurance,
    changeAdminInsurance,
    getAllInsurance,
    getConnectedHospitals,
    getInsurance,
    editInsurance,
    deleteInsurance
}