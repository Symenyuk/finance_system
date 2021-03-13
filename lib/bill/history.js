'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const permission = global.permissions;

const getBillHistory = (req, res) => {
    const bill_key = req.params.id;
    const userRole = req.decoded.userRole;
    let historyAllowStatuses = permission[userRole].historyAllowStatuses;

    let inParam = (sql, historyAllowStatuses) => {
        return sql.replace('?#', historyAllowStatuses.map(() => '?').join(','))
    }

    if (bill_key) {
        db.serialize(() => {
            db.all(inParam(`SELECT * FROM billhistory WHERE bill_key = '${bill_key}' AND status in (?#) ORDER BY status ASC`, historyAllowStatuses), historyAllowStatuses, (err, data) => {
                if (err) {
                    log.error(`Error. getBillHistory ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`None all params for getBillHistory`);
        res.status(422).send({message: `Error. None all params for getBillHistory`});
    }
}

module.exports = {
    getBillHistory
}


