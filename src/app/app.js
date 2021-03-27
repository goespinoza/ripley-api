'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/index');
const dotenv = require("dotenv");
const app = express();

const corsOption = {    
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
};

app.set(dotenv.config());

app.use(cors(corsOption));
/* app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

module.exports = app;