const serAuth = require('../services/auth');
const ObjConect = require('../db');
const { db } = ObjConect;
const { one } = ObjConect.pgp.queryResult;

const register = async (req, res) => {
  try {
    const ifExist = await db.user.findByRut(req.body.rut);
    if (!ifExist) {
      const user = await db.user.register(
        req.body.name,
        req.body.rut,
        req.body.email,
        req.body.password
      );
      res.status(200).send(user);
    } else {
      res.status(403).send({ message: 'Entered credential already exists in our records' });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const login = async (req, res) => {
  try {
    /* let password;
    password = await serAuth.decryptExt(req.body.password);
    password = serAuth.encryptInt(password); */

    const user = await db.user.login(req.body.rut, req.body.password);
    if (!user) {
      res.status(200).send({ code: 500, message: 'Incorrect username y/o password' })
    }
    if (user) {
      const token = serAuth.createToken(user);
      res.setHeader('token', token);
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  register,
  login
};