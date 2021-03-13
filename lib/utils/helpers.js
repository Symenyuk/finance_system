'use strict';

const log = require('../utils/logger');
const db = require('../db/db');

const getRandomInt = () => {
    const codeLength = 999999;
    return Math.floor(Math.random() * Math.floor(codeLength));
}

const findUserByLogin = (login, cb) => {
    return db.get(`SELECT * FROM users WHERE login = ?`, [login], (err, row) => {
        cb(err, row)
    });
}

const getRegion = (req, res) => {
    let region = req.query.region;

    if (region !== undefined) {
        db.serialize(() => {
            db.all(`SELECT * FROM regions WHERE name_en LIKE '${region}%'`, (err, data) => {
                if (err) {
                    log.error(`getRegion. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getRegion`);
        res.status(422).send({message: `Error. None all params for getRegion`});
    }
}

const getCity = (req, res) => {
    let city = req.query.city;
    let region = req.query.region;

    if (city !== undefined) {
        db.serialize(() => {
            db.all(`SELECT * FROM cities WHERE name_en LIKE '${city}%' AND region_id = ${region}`, (err, data) => {
                if (err) {
                    log.error(`getCity. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getCity`);
        res.status(422).send({message: `Error. None all params for getCity`});
    }
}

const getDistrict = (req, res) => {
    let district = req.query.district; 
    let region = req.query.region; 
    let city = req.query.city;

    if (district !== undefined) {
        db.serialize(() => {
            db.all(`SELECT * FROM districts WHERE name_en LIKE '${district}%' AND region_id = ${region} AND city_id = ${city}`, (err, data) => {
                if (err) {
                    log.error(`getDistrict. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. None all params for getDistrict`);
        res.status(422).send({message: `Error. None all params for getDistrict`});
    }
}


module.exports = {
    getRandomInt,
    findUserByLogin,
    getCity,
    getRegion,
    getDistrict
}