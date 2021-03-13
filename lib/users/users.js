'use strict';

const bcrypt = require('bcryptjs');
const log = require('../utils/logger');
const db = require('../db/db');
const sendEmail = require('../utils/mail');
const roles = require('../../config/config').role;
let findUserByLogin = require('../utils/helpers').findUserByLogin;

const registration = (req, res) => {
    let code = require('../utils/helpers').getRandomInt();

    const name = req.body.name;
    const login = req.body.login;
    const email = req.body.email;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const mobile = req.body.mobile;
    const role = req.body.role;

    const hospital = req.body.hospital;
    const insurance = req.body.insurance;

    const branch = req.body.branch;
    const department = req.body.department;

    const status = 'inactive';
    const created_at = Date.now();
    const updated_at = Date.now();

    let createNewUser = () => {
        db.serialize(() => {
            let data = [name, login, email, password, mobile, role, status, hospital, branch, department, insurance, created_at, updated_at, code];
            let stmt = db.prepare(`INSERT INTO users
                                   (name, login, email, password, mobile, role, status, hospital, branch,
                                   department, insurance, created_at, updated_at, code)
                                   VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(data, (err) => {
                if (err) {
                    log.error(`createNewUser, ${err}`);
                    res.status(500).send({message: 'Server error'});
                }
                sendEmail(code, email, 'Registration');
                if (hospital && role === roles('adminHospital')) {
                    db.run(`UPDATE users SET status = ?, hospital = ? 
                            WHERE role = 'admin_hospital' AND hospital = ? AND login NOT IN ('${login}')`, ['inactive', null, hospital], (err) => {
                        if (err) {
                            log.error(`createNewUser, update user ${err}`);
                            res.status(500).send({message: 'Server error!'})
                        }
                    });
                    db.run(`UPDATE hospitals SET admin = ? WHERE id = ?`, login, hospital, (err) => {
                        if (err) {
                            log.error(`createNewUser, update hospital ${err}`);
                            res.status(500).send({message: 'Server error!'})
                        }
                    });
                }
                if (insurance && role === roles('adminInsurance')) {
                    db.run(`UPDATE users SET status = ?, insurance = ? 
                            WHERE role = 'admin_insurance' AND insurance = ? AND login NOT IN ('${login}')`, ['inactive', null, insurance], (err) => {
                        if (err) {
                            log.error(`createNewUser, update user ${err}`);
                            res.status(500).send({message: 'Server error!'})
                        }
                    });
                    db.run(`UPDATE insurance SET admin = ? WHERE id = ?`, login, insurance, (err) => {
                        if (err) {
                            log.error(`createNewUser, update insurance ${err}`);
                            res.status(500).send({message: 'Server error!'});
                        }
                    });
                }
                res.status(200).send({message: 'Success'});
            });
            stmt.finalize();
        });
    }

    if (hospital) {
        db.get(`SELECT * FROM users WHERE login = ? AND hospital = ?`, [login, hospital], (err, user) => {
            if (err) {
                log.error(`createNewUser, hospital. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                res.status(409).send({message: 'Login already exists'});
            } else {
                createNewUser();
            }
        });
    }
    if (insurance) {
        db.get(`SELECT * FROM users WHERE login = ? AND insurance = ?`, [login, insurance], (err, user) => {
            if (err) {
                log.error(`createNewUser, insurance. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                res.status(409).send({message: 'Login already exists'});
            } else {
                createNewUser();
            }
        });
    }
    if (!hospital && !insurance) {
        db.get(`SELECT * FROM users WHERE login = ? AND hospital IS NULL AND insurance IS NULL`, [login], (err, user) => {
            if (err) {
                log.error(`createNewUser. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                res.status(409).send({message: 'Login already exists'});
            } else {
                createNewUser();
            }
        });
    }
}

const getUsers = (req, res) => {
    const type = req.params.type;
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;
    let filterName = req.query.name ? `AND users.name LIKE '${req.query.name}%'` : ``;
    let filterRole = req.query.role ? `AND users.role = '${req.query.role}'` : ``;
    let filterHospital = req.query.hospital ? `AND hospital_name LIKE '${req.query.hospital}%'` : ``;
    let filterInsurance = req.query.insurance ? `AND insurance_name LIKE '${req.query.insurance}%'` : ``;
    let filterBranch = req.query.branch ? `AND users.branch = ${req.query.branch}` : ``;
    let filterDepartment = req.query.department ? `AND users.department = ${req.query.department}` : ``;
    let orderBy = req.query.order_by ? `ORDER BY ${req.query.order_by}` : ``;

    let filterCountUsers = req.query.count;
    let filterOffset = req.query.offset || 0;

    let where = ``;
    if (hospital) {
        where = `AND users.hospital = ${hospital}`;
    }
    if (insurance) {
        where = `AND users.insurance = ${insurance}`;
    }

    let sortUser;
    if (type === 'bfs') {
        sortUser = `AND (users.role = '${roles('accountManager')}' OR users.role = '${roles('financeManager')}')`
    } else if (type === 'hospital') {
        sortUser = `AND users.role IN ('${roles('adminHospital')}', '${roles('teller')}', '${roles('financeHospital')}', '${roles('financeManagerHospital')}')`
    } else if (type === 'insurance') {
        sortUser = `AND users.role IN ('${roles('adminInsurance')}', '${roles('audit')}', '${roles('auditManagerInsurance')}', '${roles('financeManagerInsurance')}')`
    }

    db.serialize(() => {
        db.all(`SELECT users.id, users.name, users.login, users.email, users.mobile, users.role, users.status, 
                users.hospital, users.insurance, users.created_at, 
                hospitals.name as hospital_name, insurance.name as insurance_name
                FROM users
                LEFT JOIN hospitals ON hospitals.id = users.hospital
                LEFT JOIN insurance ON insurance.id = users.insurance
                WHERE users.role NOT IN ('superadmin') ${sortUser}
                ${where} ${filterName} ${filterRole} ${filterBranch} ${filterDepartment} ${filterHospital} ${filterInsurance} 
                ${orderBy}`, (err, users) => {
            if (err) {
                log.error(`db.getUsers ${err}`);
                res.status(500).send({message: 'Server error'});
            } else if (!users) {
                res.status(200).json({'count': 0, 'list': []});
            }
            let limitedData = users.slice(filterOffset, filterCountUsers ? Number(filterOffset) + Number(filterCountUsers) : users.length);
            res.status(200).send({'count': users.length, 'list': limitedData});
        });
    });
}

const getUser = (req, res) => {
    const userId = req.decoded.userId;

    if (userId) {
        db.serialize(() => {
            db.get(`SELECT users.id, users.name, users.login, users.email, users.mobile, users.role, users.status,
                    users.hospital, users.branch, users.department, users.insurance,
                    hospitals.name as hospital_name, insurance.name as insurance_name
                    FROM users
                    LEFT JOIN hospitals ON hospitals.id = users.hospital
                    LEFT JOIN insurance ON insurance.id = users.insurance
                    WHERE users.id = ?`, [userId], (err, user) => {
                if (err) {
                    log.error(`db.getUser. ${err}`);
                    res.status(500).send({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(user));
            });
        });
    } else {
        log.error(`Need 'userID' param for getUser`);
        res.status(422).send({message: `Error. Need 'userID' param for getUser`});
    }
}

const changeUserStatus = (req, res) => {
    let id = req.params.id;
    let status = req.body.status; // blocked || active
    let updated_at = Date.now();

    if (id && status) {
        db.serialize(() => {
            db.run(`UPDATE users SET status = ?, updated_at = ? WHERE id = ?`, [status, updated_at, id], (err) => {
                if (err) {
                    log.error(`db.changeUserStatus. ${err}`);
                    res.status(500).send({message: 'Server error!'})
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. None all params for changeUserStatus`);
        res.status(422).send({message: `Error. None all params for changeUserStatus`});
    }
}

const deleteUser = (req, res) => {
    let id = req.params.id;

    if (id) {
        db.serialize(() => {
            db.all(`SELECT login, role FROM users WHERE id = ?`, id, (err, data) => {
                if (err) return res.status(500).send({message: 'Server error!'});
                if (data) {
                    if (data[0].role === 'admin_hospital') {
                        db.run(`UPDATE hospitals SET admin = ? WHERE admin = ?`, null, data[0].login, (err) => {
                            if (err) {
                                log.error(`deleteUser. ${err}`);
                                return res.status(500).send({message: 'Server error!'});
                            }
                        });
                    }
                    if (data[0].role === 'admin_insurance') {
                        db.run(`UPDATE insurance SET admin = ? WHERE admin = ?`, null, data[0].login, (err) => {
                            if (err) {
                                log.error(`deleteUser. ${err}`);
                                res.status(500).send({message: 'Server error!'});
                            }
                        });
                    }
                }
            });
            db.run(`DELETE FROM users WHERE id = ?`, id, (err) => {
                if (err) {
                    log.error(`deleteUser. ${err}`);
                    res.status(500).send({message: 'Server error!'});
                }
                res.status(200).send({message: 'Success'});
            });
        });
    } else {
        log.error(`Error. None all params for deleteUser`);
        res.status(422).send({message: `Error. None all params for deleteUser`});
    }
}

const changeUserData = (req, res) => {
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;
    const userRole = req.decoded.userRole;

    let changeNotYourAccount = req.body.change_not_your_account;
    let user_login, user_id;

    if (userRole === roles('superAdmin') && changeNotYourAccount === 1) {
        user_login = req.body.user_login;
        user_id = req.body.user_id;
    } else {
        user_login = req.decoded.userLogin;
        user_id = req.decoded.userId;
    }

    const name = req.body.name;
    const login = req.body.login;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const new_password = req.body.new_password;
    const change_password = req.body.change_password; // true || false
    const updated_at = Date.now();

    findUserByLogin(user_login, (err, user) => {
        if (err) {
            log.error(`changeUserData. ${err}`);
            res.status(500).send({message: 'Server error!'});
        }
        if (user) {
            let passResult;

            let runChangeData = () => {
                if (change_password === true) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash_password = bcrypt.hashSync(new_password, salt);

                    db.serialize(() => {
                        db.run(`UPDATE users SET name = ?, login = ?, email = ?, mobile = ?, password = ?, updated_at = ? WHERE id = ?`,
                            [name, login, email, mobile, hash_password, updated_at, user_id], (err) => {
                                if (err) {
                                    log.error(`changeUserData. ${err}`);
                                    res.status(500).send({message: 'Server error!'})
                                }
                                res.status(200).send({message: 'Success'});
                            });
                    });
                } else {
                    db.serialize(() => {
                        db.run(`UPDATE users SET name = ?, login = ?, email = ?, mobile = ?, updated_at = ? WHERE id = ?`,
                            [name, login, email, mobile, updated_at, user_id], (err) => {
                                if (err) {
                                    log.error(`changeUserData. ${err}`);
                                    res.status(500).send({message: 'Server error!'});
                                }
                                res.status(200).send({message: 'Success'});
                            });
                    });
                }
            }

            if (hospital) {
                db.get(`SELECT login FROM users WHERE login = ? AND hospital = ?`, [login, hospital], (err, user) => {
                    if (err) {
                        log.error(`changeUserData, hospital. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    if (!user || user_login === user.login) {
                        checkPassword();
                    } else {
                        res.status(409).send({message: 'Login already exists'});
                    }
                });
            }
            if (insurance) {
                db.get(`SELECT login FROM users WHERE login = ? AND insurance = ?`, [login, insurance], (err, user) => {
                    if (err) {
                        log.error(`changeUserData, insurance. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    if (!user || user_login === user.login) {
                        checkPassword();
                    } else {
                        res.status(409).send({message: 'Login already exists'});
                    }
                });
            }
            if (!hospital && !insurance) {
                db.get(`SELECT login FROM users WHERE login = ?`, [login], (err, user) => {
                    if (err) {
                        log.error(`changeUserData, admins. ${err}`);
                        res.status(500).send({message: 'Server error!'});
                    }
                    if (!user || user_login === user.login) {
                        checkPassword();
                    } else {
                        res.status(409).send({message: 'Login already exists'});
                    }
                });
            }

            function checkPassword() {
                // check s-admin password
                if (userRole === roles('superAdmin') && changeNotYourAccount === 1) {
                
                    db.serialize(() => {
                        db.get(`SELECT password FROM users WHERE role = 'superadmin'`, (err, data) => {
                            if (err) {
                                log.error(`db.select superadmin. ${err}`);
                                res.status(500).send({message: 'Server error'});
                            }
                            passResult = bcrypt.compareSync(password, data.password);
                            if (passResult) {
                                runChangeData();
                            } else {
                                res.status(401).json({message: 'Password not valid!'});
                            }
                        });
                    });
                } else {
                    // check user password
                    passResult = bcrypt.compareSync(password, user.password);
                    if (passResult) {
                        runChangeData();
                    } else {
                        res.status(401).json({message: 'Password not valid!'});
                    }
                }
            }
        } else {
            return res.status(403).send({message: 'Access is forbidden'});
        }
    });
}

module.exports = {
    registration,
    getUsers,
    getUser,
    changeUserStatus,
    deleteUser,
    changeUserData
}
