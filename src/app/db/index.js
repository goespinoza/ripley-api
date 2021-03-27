'use strict'

require("dotenv").config();
const promise = require('bluebird'); // best promise library today
const pgPromise = require('pg-promise'); // pg-promise core library
const { User, Account, Trx } = require('./repos');

// pg-promise initialization options:
const initOptions = {
    promiseLib: promise,
    extend(obj, dc) {
        obj.user = new User(obj, pgp);
        obj.account = new Account(obj, pgp);
        obj.trx = new Trx(obj, pgp);
    }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(process.env.DB_CONNECTION);

module.exports = { db, pgp }