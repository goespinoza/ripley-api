const serAuth = require('../services/auth');
const ObjConect = require('../db');
const { db } = ObjConect;
const random = require('random')

const insAccount = async (req, res) => {
  try {
    const number =
      `${random.int((min = 0), (max = 999))}-${random.int((min = 10000), (max = 99999))}-${random.int((min = 0), (max = 99))}`
    const { user } = serAuth.decodeToken(req.headers.authorization);
    const account = await db.account.insAccount(number, user.id);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await db.account.getAccount(req.params.id);
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  insAccount,
  getAccount
};