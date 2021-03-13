module.exports = (db) => {
    const bcrypt = require('bcryptjs');
    const log = require('../utils/logger');

    db.all(`SELECT * FROM users`, (err, users) => {
        if (err) {
            log.error('DB error. initAdmin');
        }
        if (!users.length) {
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(global.config.super_admin.password, salt);
            db.run(`INSERT INTO users(name, login, password, role, status)VALUES(?, ?, ?, ?, ?)`,
                ['superadmin', global.config.super_admin.login, password, 'superadmin', 'active'], (err) => {
                    if (err) {
                        log.error('DB error, admin not created', err);
                    }
                });
        }
    });
}