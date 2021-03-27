const moment = require('moment');
const serAuth = require('../services/auth');
const ObjConect = require('../db');
const { db } = ObjConect;

const insTrx = async (req, res) => {
  try {
    const { user } = serAuth.decodeToken(req.headers.authorization);
    const trx = await db.trx.insTrx(
      user.id,
      req.body.trx_typ,
      req.body.ori_acc,
      req.body.des_acc,
      req.body.amount,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );
    res.status(200).send(trx);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getTrxByAccount = async (req, res) => {
  try {
    const trx = await db.trx.getTrxByAccount(req.params.account);
    res.status(200).send(trx);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  insTrx,
  getTrxByAccount
};