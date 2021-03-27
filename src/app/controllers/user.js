const serAuth = require('../services/auth');
const ObjConect = require('../db');
const { db } = ObjConect;

const getUsers = async (req, res) => {
  try {
    const { user } = serAuth.decodeToken(req.headers.authorization);
    const data = await db.user.findAll();
    const users = data.filter(element => element.id !== user.id);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getUsers
};