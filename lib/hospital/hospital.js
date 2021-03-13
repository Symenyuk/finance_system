'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const roles = require('../../config/config').role;

const createHospital = (req, res) => {
    const name = req.body.name;
    const name_unique = req.body.name_unique;
    const zip_code = req.body.zip_code;

    const contact_person_name = req.body.contact_person_name;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_phone = req.body.contact_person_phone;

    const owner = req.decoded.userLogin;
    const admin = null;
    const created_at = Date.now();
    const updated_at = Date.now();

    if (owner !== undefined && name_unique && zip_code) {
        db.serialize(() => {
            db.get(`SELECT name_unique FROM hospitals WHERE name_unique = ?`, [name_unique], (err, row) => {
                if (err) {
                    log.error(`createHospital. ${err}`);
                    res.status(500).send({message: 'Server error'});
                }
                if (row) {
                    res.status(409).send({message: 'Unique name already exists'});
                } else {
                    let data = [name, name_unique, zip_code, contact_person_name, contact_person_email, contact_person_phone, owner, admin, created_at, updated_at];
                    let stmt = db.prepare(`INSERT INTO hospitals
                                       (name, name_unique, zip_code, contact_person_name, contact_person_email,
                                       contact_person_phone, owner, admin, created_at, updated_at)
                                       VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                    stmt.run(data, (err) => {
                        if (err) {
                            log.error(`createHospital. ${err}`);
                            res.status(500).send({message: 'Server error'});
                        }
                        res.status(200).send({message: 'Success'});
                    });
                    stmt.finalize();
                }
            });
        });
    } else {
        log.error(`Error. None all params for createHospital`);
        res.status(422).send({message: `Error. None all params for createHospital`});
    }
}


const changeAdminHospital = (req, res) => {
    let id = req.params.id;
    const admin = req.body.admin; // login

    if (id && admin) {
        db.serialize(() => {
            db.run('begin transaction');
            db.get(`SELECT id FROM users WHERE hospital = ?`, id, (err, data) => {
                if (err) {
                    log.error(`changeAdminHospital. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                if (data) {
                    db.run(`UPDATE users SET hospital = ? WHERE id = ?`, [null, data.id], (err) => {
                        if (err) {
                            log.error(`changeAdminHospital. ${err}`);
                            res.status(500).send({message: 'Server error!'});
                        }
                    });
                }
            });

            db.run(`UPDATE hospitals SET admin = ? WHERE id = ?`, [admin, id], (err) => {
                if (err) {
                    log.error(`changeAdminHospital. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
            });
            db.run(`UPDATE users SET hospital = ? WHERE login = ?`, [id, admin], (err) => {
                if (err) {
                    log.error(`changeAdminHospital. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
            });

            db.run('commit');
            res.status(200).send({message: 'Success'});
        });

    } else {
        log.error(`Error. None all params for changeAdminHospital`);
        res.status(422).send({message: `Error. None all params for changeAdminHospital`});
    }
}


const getAllHospital = (req, res) => {
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
            db.all(`SELECT * FROM hospitals WHERE id NOT IN ('null') ${where} ${filterName} ${orderBy}`, (err, data) => {
                if (err) {
                    log.error(`getAllHospital. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getAllHospital`);
        res.status(422).send({message: `Error. None all params for getAllHospital`});
    }
}

const getConnectedInsurances = (req, res) => {
    const hospital = req.decoded.hospital;

    if (hospital) {
        db.serialize(() => {
            db.all(`SELECT insurance.*, agreements.created_at as agreement_created, agreements.transaction_interval as agreement_interval FROM insurance LEFT JOIN agreements ON agreements.insurance = insurance.id AND agreements.hospital = ? WHERE insurance.id IN (SELECT insurance FROM agreements WHERE hospital = ?)`, hospital, hospital, (err, data) => {
                if (err) {
                    log.error(`getConnectedInsurances. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getConnectedInsurances`);
        res.status(422).send({message: `Error. None all params for getConnectedInsurances`});
    }
}

const getHospital = (req, res) => {
    const id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.get(`SELECT * FROM hospitals WHERE id = ?`, id, (err, data) => {
                if (err) {
                    log.error(`getHospital. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. Need 'id' param for getHospital`);
        res.status(422).send({message: `Error. Need 'id' param for getHospital`});
    }
}

const editHospital = (req, res) => {
    let id = req.params.id;

    const name = req.body.name;
    const zip_code = req.body.zip_code;

    const contact_person_name = req.body.contact_person_name;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_phone = req.body.contact_person_phone;
    const updated_at = Date.now();

    if (id && name && zip_code) {
        db.run(`UPDATE hospitals SET name = ?, zip_code = ?, contact_person_name = ?, contact_person_email = ?, contact_person_phone =
                ?, updated_at = ? WHERE id = ?`,
                [name, zip_code, contact_person_name, contact_person_email, contact_person_phone, updated_at, id], (err) => {
                if (err) {
                    log.error(`editHospital. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
    } else {
        log.error(`Error. Need 'id' param for editHospital`);
        res.status(422).send({message: `Error. Need 'id' param for editHospital`});
    }
}

const deleteHospital = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.run(`DELETE FROM hospitals WHERE id = ?`, id, (err) => {
                if (err) {
                    log.error(`deleteHospital. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                db.run(`DELETE FROM branch WHERE hospital = ?`, id, (err) => {
                    if (err) {
                        log.error(`deleteHospital. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                });
                db.run(`DELETE FROM department WHERE hospital = ?`, id, (err) => {
                    if (err) {
                        log.error(`deleteHospital. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                });
                db.run(`UPDATE users SET hospital = ? WHERE hospital = ?`, null, id, (err) => {
                    if (err) {
                        log.error(`deleteHospital. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    res.status(200).send({message: 'Success'});
                })
            });
        });
    } else {
        log.error(`Error. Need 'id' param for deleteHospital`);
        res.status(422).send({message: `Error. Need 'id' param for deleteHospital`});
    }
}


module.exports = {
    createHospital,
    changeAdminHospital,
    getAllHospital,
    getConnectedInsurances,
    getHospital,
    editHospital,
    deleteHospital
}
