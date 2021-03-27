const express = require('express');
const auth = require('../middleware/auth');

const api = express.Router();
const authCtrl = require('../controllers/auth');
const accountCtrl = require('../controllers/account');
const trxCtrl = require('../controllers/trx');
const userCtrl = require('../controllers/user')

/* PUBLIC METHODS */
api.post('/public/user/register', auth.general('register'), authCtrl.register);
api.post('/public/user/login', auth.general('login'), authCtrl.login);

/* PRIVATE METHODS */
api.post('/private/account', auth.verify, auth.general('account'), accountCtrl.insAccount)
api.post('/private/trx', auth.verify, auth.general('trx'), trxCtrl.insTrx)

api.get('/private/account/:id', auth.verify, auth.general('account'), accountCtrl.getAccount)
api.get('/private/users', auth.verify, auth.general('users'), userCtrl.getUsers)

module.exports = api;