const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization !== 'null') {
    jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          name: err.name,
          message: err.message
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({ message: 'Token is not proved' });
  }
}

function general(serviceName) {
  return function (req, res, next) {

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
    res.setHeader('Access-Control-Expose-Headers', `token, service-name`);
    res.setHeader('service-name', serviceName);
    if (req.headers.authorization && req.headers.authorization !== 'null') {
      res.setHeader('token', req.headers.authorization);
    }
    next();
  }
}

module.exports = {
  general,
  verify
}