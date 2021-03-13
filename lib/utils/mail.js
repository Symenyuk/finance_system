'use strict';

const log = require('./logger');
const nodemailer = require("nodemailer");
const mailConfig = global.config.mail;

let getCurrentDate = () => {
    let today = new Date();
    return today.getUTCFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCDate() + ' ' + today.getUTCHours() +
        ':' + (today.getUTCMinutes() > 9 ? today.getUTCMinutes() : '0' + today.getUTCMinutes());
}

const sendEmail = (code, email, subject) => {

    let transport = nodemailer.createTransport({
        host: mailConfig.host,
        port: 587,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.password,
        }
    });
    let mailOptions = {
        from: mailConfig.from,
        to: email,
        subject: subject,
        text: `Unique pass ${code} send by BFS at ${getCurrentDate()} UTC`,
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            log.error(`Email not sent`, error);
        }
        log.info(`Email sent! id: ${info.messageId}, to: ${info.accepted}, (${getCurrentDate()} UTC)`);
    });

}

module.exports = sendEmail;
