const {json} = require('express');

const disablePoweredBy = (_, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
};

module.exports = (app) => {
  app.use(json());
  app.use(disablePoweredBy);
};
