'use strict';

const log = require('../utils/logger');
const db = require('../db/db');

const createService = (req, res) => {
    const name = req.body.name; // unique
    const hospital = req.decoded.hospital;
    const created_at = Date.now();
    const updated_at = Date.now();

    if (hospital) {
        db.get(`SELECT name FROM services WHERE name = ? AND hospital = ?`, [name, hospital], (err, data) => {
            if (err) {
                log.error(`createService. ${err}`);
                res.status(500).send({message: 'Server error'});
            }
            if (data) {
                res.status(409).send({message: 'Service with the same name already exists'});
            } else {
                let data = [name, hospital, created_at, updated_at];
                let stmt = db.prepare(`INSERT INTO services (name, hospital, created_at, updated_at) VALUES (?,?,?,?)`);
                stmt.run(data, (err) => {
                    if (err) {
                        log.error(`createService. ${err}`);
                        res.status(500).send({message: 'Server error'});
                    }
                    res.status(200).send({message: 'Success'});
                });
                stmt.finalize();
            }
        });
    } else {
        log.error(`Error. None all params for createService`);
        res.status(422).send({message: `Error. None all params for createService`});
    }
}

const getServices = (req, res) => {
    const hospital = req.decoded.hospital;
    let orderBy = req.query.order_by ? `ORDER BY ${req.query.order_by}` : ``;
    let filterCountServices = req.query.count;
    let filterOffset = req.query.offset || 0;

    if (hospital) {
        db.serialize(() => {
            db.all(`SELECT * FROM services WHERE hospital = ? ${orderBy}`, [hospital], (err, data) => {
                if (err) {
                    log.error(`getServices. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCountServices ? Number(filterOffset) + Number(filterCountServices) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getServices`);
        res.status(422).send({message: `Error. None all params for getServices`});
    }
}

const getService = (req, res) => {
    let id = req.params.id;
    const hospital = req.decoded.hospital;

    if (id && hospital) {
        db.serialize(() => {
            db.get(`SELECT * FROM services WHERE hospital = ? AND id = ?`, [hospital, id], (err, data) => {
                if (err) {
                    log.error(`getService. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getService`);
        res.status(422).send({message: `Error. None all params for getService`});
    }
}

const editService = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    const updated_at = Date.now();

    if (id) {
        db.run(`UPDATE services SET name = ?, updated_at = ? WHERE id = ?`, [name, updated_at, id], (err) => {
            if (err) {
                log.error(`editService. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            res.status(200).send({message: 'Success'});
        });
    } else {
        log.error(`Error. Need 'id' param for editService`);
        res.status(422).send({message: `Error. Need 'id' param for editService`});
    }
}

const deleteService = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.run(`DELETE FROM services WHERE id = ?`, id, (err) => {
                if (err) {
                    log.error(`deleteService. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. Need 'id' param for deleteService`);
        res.status(422).send({message: `Error.  Need 'id' param for deleteService`});
    }
}

module.exports = {
    createService,
    getService,
    getServices,
    editService,
    deleteService
}