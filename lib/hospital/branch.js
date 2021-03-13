'use strict';

const log = require('../utils/logger');
const db = require('../db/db');

const createBranch = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const region = req.body.region;
    const city = req.body.city;
    const district = req.body.district;

    const street = req.body.street;
    const building = req.body.building;

    const email = req.body.email;
    const tel = req.body.tel;
    const mobile = req.body.mobile;

    const extension = req.body.extension;

    const manager_id = req.body.manager_id;
    const hospital = req.decoded.hospital;
    const created_at = Date.now();
    const updated_at = Date.now();

    db.serialize(() => {
        let data = [name, description, region, city, district, street, building, email, tel, mobile, extension, manager_id, hospital, created_at, updated_at];
        let stmt = db.prepare(`INSERT INTO branch(
                               name, description, region, city, district, street, building, email, tel, mobile, extension, manager_id, hospital, created_at, updated_at)
                               VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(data, (err) => {
            if (err) {
                log.error(`createBranch. ${err}`);
                res.status(500).send({message: 'Server error'});
            }
            res.status(200).send({message: 'Success'});
        });
        stmt.finalize();
    });
}

const getBranch = (req, res) => {
    const id = req.params.id;
    const hospital = req.decoded.hospital;

    if (id && hospital) {
        db.serialize(() => {
            db.get(`SELECT * FROM branch WHERE id = ? AND hospital = ?`, [id, hospital], (err, data) => {
                if (err) {
                    log.error(`getBranch. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getBranch`);
        res.status(422).send({message: `Error. None all params for getBranch`});
    }
}

const getAllBranches = (req, res) => {
    const hospital = req.decoded.hospital;
    let orderBy = req.query.order_by ? `ORDER BY ${req.query.order_by}` : ``;
    let filterCount = req.query.count;
    let filterOffset = req.query.offset || 0;

    if (hospital) {
        db.serialize(() => {
            db.all(`SELECT * FROM branch WHERE hospital = ? ${orderBy}`, hospital, (err, data) => {
                if (err) {
                    log.error(`getAllBranches. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCount ? Number(filterOffset) + Number(filterCount) : data.length);
                res.status(200).send({'count': data.length, 'list': limitedData});
            });
        });
    } else {
        log.error(`Error. None all params for getAllBranches`);
        res.status(422).send({message: `Error. None all params for getAllBranches`});
    }
}

const editBranch = (req, res) => {
    const id = req.params.id;

    const name = req.body.name;
    const description = req.body.description;

    const region = req.body.region;
    const city = req.body.city;
    const district = req.body.district;

    const street = req.body.street;
    const building = req.body.building;

    const email = req.body.email;
    const tel = req.body.tel;
    const mobile = req.body.mobile;

    const extension = req.body.extension;

    const manager_id = req.body.manager_id;
    const updated_at = Date.now();

    if (id) {
        db.serialize(() => {
            db.run(`UPDATE branch SET name = ?, description = ?, 
                    region = ?, city = ?, district = ?, street = ?, building = ?, 
                    email = ?, tel = ?, mobile = ?,
                    extension = ?, manager_id = ?, updated_at = ? 
                    WHERE id = ?`,
                    [name, description, region, city, district, street, building, email, tel, mobile, extension, manager_id, updated_at, id], (err) => {
                    if (err) {
                        log.error(`editBranch. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    res.status(200).send({message: 'Success'});
                });
        });
    } else {
        log.error(`Error. Need 'id' param for editBranch`);
        res.status(422).send({message: `Error. Need 'id' param for editBranch`});
    }
}

const deleteBranch = (req, res) => {
    const id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.run(`DELETE FROM branch WHERE id = ?`, id, (err) => {
                if (err) return res.status(500).send({message: 'Server error!'});
                db.run(`DELETE FROM department WHERE branch = ?`, id, (err) => {
                    if (err) {
                        log.error(`deleteBranch. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    res.status(200).send({message: 'Success'});
                });
            });
        });
    } else {
        log.error(`Error. Need 'id' param for deleteBranch`);
        res.status(422).send({message: `Error. Need 'id' param for deleteBranch`});
    }
}


module.exports = {
    createBranch,
    getBranch,
    getAllBranches,
    editBranch,
    deleteBranch,
}
