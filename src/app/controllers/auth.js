const serAuth = require('../services/auth');
const ObjConect = require('../db');
const { db } = ObjConect;

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
      res.status(403).send({ message: 'Usuario ya existe en nuestros registros' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Servidor no disponible. Favor intenta más tarde' });
  }
};

const login = async (req, res) => {
  try {
    const user = await db.user.login(req.body.rut, req.body.password);
    if (!user) {
      res.status(403).send({ message: 'Usuario y/o Contraseña incorrecto' })
    }
    if (user) {
      const token = serAuth.createToken(user);
      res.setHeader('token', token);
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: 'Servidor no disponible. Favor intenta más tarde' });
  }
};

module.exports = {
  register,
  login
};