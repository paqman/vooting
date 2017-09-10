const uuid = require('uuid');

const options = {maxAge: 365 * 24 * 60 * 60 * 1000};

const handleUserSession = (req, res, next) => {
  let idUser = req.cookies.idUser;
  if (idUser === undefined) {
    idUser = uuid.v1();
    res.cookie('idUser', idUser, options);
  }

  res.locals.user = idUser;
  next();
};

module.exports = {
  handleUserSession
};