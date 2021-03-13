'use strict';

const compression = require('compression');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const log = require('./lib/utils/logger');

// config
let config = fs.readFileSync('./config/config.json');
let permissions = fs.readFileSync('./config/permissions.json');
global.config = JSON.parse(config);
global.permissions = JSON.parse(permissions);

// routes
const publicRouter = require('./routes/publicRoutes');
const secureRouter = require('./routes/secureRoutes');

const serverPort = global.config.server_port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '1kb'}));
app.use(cors());
app.use(compression());
app.use(helmet());

app.use((req, res, next) => {
    const allowedOrigins = global.config.allowed_origins;
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        next();
    } else {
        res.status(403).send({message: 'The cors policy for this origin does`t allow access from the particular origin'});
        log.error('The cors policy for this origin does`t allow access from the particular origin.', origin);
    }
});

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 1000, // start blocking after 1000 requests)
    message: "You have exceeded the 1000 requests in 1 hrs limit!"
});

app.use('/', publicRouter);
app.use('/api', secureRouter, apiLimiter);

const server = app.listen(parseInt(serverPort), (req, res, error) => {
    if (error) return log.error(`Error: ${error}`);
    log.info(`Server listening on port ${server.address().port}`);
});
