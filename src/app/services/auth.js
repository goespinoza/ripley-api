const moment = require('moment');
const jwt = require('jsonwebtoken');

function createToken(user = {}) {
  const payload = {
      sub: 1,
      iat: moment().unix(),
      exp: moment().add(30, "days").unix(),
      user
  }
  return jwt.sign(payload, process.env.SECRET_TOKEN);
}

function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  createToken,
  decodeToken
}