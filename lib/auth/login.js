'use strict';

const log = require('../utils/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db/db');
const findUserByLogin = require('../utils/helpers').findUserByLogin;
const sendEmail = require('../utils/mail');

const SECRET_KEY = global.config.jwt.access_token_key;
const REFRESH_KEY = global.config.jwt.refresh_token_key;
const accessTokenLife = global.config.jwt.access_token_life;
const refreshTokenLife = global.config.jwt.refresh_token_life;
const permission = global.permissions;


const issueTokenPair = (userId, userRole, userLogin, hospital, insurance) => {
    const accessToken = jwt.sign(
        {
            userId: userId,
            userRole: userRole,
            userLogin: userLogin,
            hospital: hospital,
            insurance: insurance
        },
        SECRET_KEY,
        {expiresIn: accessTokenLife}
    );
    const refreshToken = jwt.sign(
        {
            userId: userId,
            userRole: userRole
        },
        REFRESH_KEY,
        {expiresIn: refreshTokenLife}
    );
    db.run(`UPDATE users SET refresh_token = ? WHERE id = ?`, [refreshToken, userId], (err) => {
        if (err) log.error(`Update refresh_token. ${err}`);
    });
    return {
        success: true,
        data: {
            'access_token': accessToken,
            'refresh_token': refreshToken,
            'expires_in': new Date().setMilliseconds(accessTokenLife),
            'permission': permission[userRole]
        }
    }
};

const login = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const whence = req.body.whence;

    if (login && password && whence) {
        findUserByLogin(login, (err, user) => {
            if (err) {
                log.error(`findUserByLogin. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                const passResult = bcrypt.compareSync(password, user.password);
                if (passResult) {
                    let userPermission = permission[user.role][whence];
                    if (!userPermission) {
                        res.status(404).json({message: 'User not found!'});
                    } else {
                        let success = () => {
                            let response;
                            switch (user.status) {
                                case 'active':
                                    response = issueTokenPair(user.id, user.role, user.login, user.hospital, user.insurance);
                                    break;
                                case 'blocked':
                                    response = {success: false, message: 'user_blocked'};
                                    break;
                                case 'inactive':
                                    response = {success: false, message: 'activate_account'};
                                    break;
                                default:
                                    response = {success: false, message: 'indefinite_status'};
                                    break;
                            }
                            res.status(200).send(response);
                        }
                        if (whence === 'admin_app') {
                            success();
                        } else {
                            if (!user.hospital && !user.insurance) {
                                res.status(200).json({success: false, message: 'no_binding'});
                            } else {
                                success();
                            }
                        }
                    }
                } else {
                    res.status(401).json({message: 'Password or Login not valid!'});
                }
            } else {
                res.status(404).json({message: 'User not found!'});
            }
        });
    } else {
        log.error(`Error. None all params for login`);
        res.status(422).send({message: `Error. None all params for login`});
    }
}

const activateAccount = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const code = req.body.code;

    if (login && password && code) {
        db.serialize(() => {
            db.get(`SELECT id, login, password, role, hospital, insurance, code FROM users WHERE code = ?`,
                [code], (err, user) => {
                if (err) {
                    log.error(`activateAccount. ${err}`);
                    res.status(500).send({message: 'Server error'});
                }
                if (user) {
                    const passResult = bcrypt.compareSync(password, user.password);
                    if (user.login === login && passResult) {
                        db.run(`UPDATE users SET status = 'active' WHERE code = ?`, code, (err) => {
                            if (err) {
                                log.error(`activateAccount. ${err}`);
                                res.status(500).send({message: 'Server error!'})
                            }
                            res.status(200).send(issueTokenPair(user.id, user.role, user.login, user.hospital, user.insurance));
                        });
                    } else {
                        res.status(401).json({message: 'Password or Login not valid!'})
                    }
                } else {
                    res.status(401).json({message: 'Code not valid!'});
                }
            });
        });
    } else {
        log.error(`Error. None all params for activateAccount`);
        res.status(422).send({message: `Error. None all params for activateAccount`});
    }
}

const tokenRefresh = (req, res) => {
    const refreshToken = req.body.refresh_token;

    if (!refreshToken) {
        return res.status(403).send({message: 'Access is forbidden'});
    }
    db.get(`SELECT id, role, login, refresh_token, hospital, insurance FROM users WHERE refresh_token =
            ?`, [refreshToken], (err, dbUser) => {
        if (err) {
            log.error(`tokenRefresh. ${err}`);
            res.status(500).send({message: 'DB error!', err});
        }
        if (dbUser) {
            jwt.verify(refreshToken, REFRESH_KEY, (err, user) => {
                if (err) return res.status(403).send({message: 'Access is forbidden'});
                if (dbUser.id === user.userId) {
                    res.status(200).send(issueTokenPair(dbUser.id, dbUser.role, dbUser.login, dbUser.hospital, dbUser.insurance));
                } else {
                    return res.status(403).send({message: 'Access is forbidden'});
                }
            });
        } else {
            return res.status(403).send({message: 'Access is forbidden'});
        }
    });
}

const forgotPassword = (req, res) => {
    const login = req.body.login;
    const email = req.body.email;
    const whence = req.body.whence;
    let code = require('../utils/helpers').getRandomInt();

    if (login && email && whence) {
        findUserByLogin(login, (err, user) => {
            if (err) {
                log.error(`forgotPassword. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                if (email !== user.email) {
                    res.status(404).json({message: 'Email not valid!'});
                } else {
                    sendEmail(code, user.email, 'Forgot password');
                    db.run(`UPDATE users SET code = ? WHERE login = ?`, [code, login], (err) => {
                        if (err) {
                            log.error(`forgotPassword. ${err}`);
                            res.status(500).send({message: 'Server error!'});
                        }
                        res.status(200).send({message: 'Success'});
                    });
                }
            } else {
                res.status(404).json({message: 'User not found!'});
            }
        });
    } else {
        log.error(`Error. None all params for forgotPassword`);
        res.status(422).send({message: `Error. None all params for forgotPassword`});
    }
}

const recoveryAccount = (req, res) => {
    const login = req.body.login;
    const email = req.body.email;
    const code = req.body.code;
    const whence = req.body.whence;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt); // new password

    if (login && email && code && whence && password) {
        findUserByLogin(login, (err, user) => {
            if (err) {
                log.error(`recoveryAccount. ${err}`);
                res.status(500).send({message: 'Server error!'});
            }
            if (user) {
                if ((login !== user.login) || (email !== user.email) || (Number(code) !== user.code)) {
                    res.status(404).json({message: 'Data not valid!'});
                } else {
                    db.run(`UPDATE users SET password = ? WHERE login = ? AND code = ? AND email = ?`,
                        [password, login, code, email], (err) => {
                        if (err) {
                            log.error(`recoveryAccount. ${err}`);
                            res.status(500).send({message: 'Server error!'})
                        }
                        res.status(200).send({message: 'Password changed'});
                    });
                }
            } else {
                res.status(404).json({message: 'User not found!'});
            }
        });
    } else {
        log.error(`Error. None all params for recoveryAccount`);
        res.status(422).send({message: `Error. None all params for recoveryAccount`});
    }
}


module.exports = {
    login,
    activateAccount,
    tokenRefresh,
    forgotPassword,
    recoveryAccount
}

