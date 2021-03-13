'use strict';

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const signIn = require('../lib/auth/login');
const helpers = require('../lib/utils/helpers');

const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 30, // start blocking after 30 requests
    message: "You have exceeded the 30 requests in 1 hrs limit!"
});
const changeDataLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: "You have exceeded the 5 requests in 1 hrs limit!"
});


router.post('/login', signIn.login, loginLimiter);
router.post('/token_refresh', signIn.tokenRefresh);
router.post('/activate_account', signIn.activateAccount, loginLimiter);
router.post('/forgot_password', signIn.forgotPassword, changeDataLimiter);
router.post('/recovery_account', signIn.recoveryAccount, changeDataLimiter);
router.get('/get_city', helpers.getCity);
router.get('/get_region', helpers.getRegion);
router.get('/get_district', helpers.getDistrict);


module.exports = router;