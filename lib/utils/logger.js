'use strict';

const winston = require('winston');

const logger = winston.createLogger({

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(log => {
            return `${log.timestamp} | ${log.level}: ${log.message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            level: 'error',
            colorize: false,
            json: false,
            maxsize: 5242880, // 5MB
            maxFiles: 15,
            filename: './logs/error.server.log',
            handleException: true
        }),
        new winston.transports.File({
            level: 'info',
            colorize: false,
            json: false,
            maxsize: 5242880, // 5MB
            maxFiles: 15,
            filename: './logs/info.server.log',
            handleException: true
        }),
        new winston.transports.Console({
            level: 'info',
            colorize: true
        })
    ]
});

module.exports = logger;
