'use strict';

const log = require('../utils/logger');
const db = require('../db/db');

const createDepartment = (req, res) => {
    const name = req.body.name;
    const hospital = req.decoded.hospital;
    const branch = req.body.branch;
    const created_at = Date.now();
    const updated_at = Date.now();

    db.serialize(() => {
        let data = [name, hospital, branch, created_at, updated_at];
        let stmt = db.prepare(`INSERT INTO department(name, hospital, branch, created_at, updated_at)VALUES(?, ?, ?, ?, ?)`);
        stmt.run(data, (err) => {
            if (err) return res.status(500).send({message: 'Server error'});
            res.status(200).send({message: 'Success'});
        });
        stmt.finalize();
    });
}

const getDepartment = (req, res) => {
    const id = req.params.id;
    const hospital = req.decoded.hospital;
    const branch = req.query.branch;

    if (id && hospital && branch) {
        db.serialize(() => {
            db.get(`SELECT * FROM department WHERE id = ? AND hospital = ? AND branch = ?`,
                [id, hospital, branch], (err, data) => {
                    if (err) {
                        res.status(500).json({message: 'Server error'});
                    }
                    res.status(200).send(JSON.stringify(data));
                });
        });
    } else {
        log.error(`Error. None all params for getDepartment`);
        res.status(422).send({message: `Error. None all params for getDepartment`});
    }
}

const getAllDepartments = (req, res) => {
    const hospital = req.decoded.hospital;
    const branch = req.query.branch;
    let orderBy = req.query.order_by ? `ORDER BY ${req.query.order_by}` : ``;
    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    if (hospital && branch) {
        db.serialize(() => {
            db.all(`SELECT * FROM department WHERE hospital = ? AND branch = ? ${orderBy}`, [hospital, branch], (err, data) => {
                if (err) {
                    log.error(`getAllDepartments. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getDepartment`);
        res.status(422).send({message: `Error. None all params for getDepartment`});
    }
}

const editDepartment = (req, res) => {
    let id = req.params.id;
    const name = req.body.name;
    const updated_at = Date.now();

    if (id) {
        db.run(`UPDATE department SET name = ?, updated_at = ? WHERE id = ?`, [name, updated_at, id], (err) => {
            if (err) {
                log.error(`editDepartment. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            res.status(200).send({message: 'Success'});
        });
    } else {
        log.error(`Error. Need 'id' param for editDepartment`);
        res.status(422).send({message: `Error. Need 'id' param for editDepartment`});
    }
}

const deleteDepartment = (req, res) => {
    const id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.run(`DELETE FROM department WHERE id = ?`, id, (err) => {
                if (err) {
                    log.error(`deleteDepartment. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. Need 'id' param for deleteBranch`);
        res.status(422).send({message: `Error. Need 'id' param for deleteDepartment`});
    }
}

module.exports = {
    createDepartment,
    getDepartment,
    getAllDepartments,
    editDepartment,
    deleteDepartment
}