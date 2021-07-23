import {Express, Request, Response, NextFunction} from 'express';

import {json} from 'express';
import cors = require('cors');

import {ORIGIN_PORT} from './config/config';

const disablePoweredBy = (_: Request, res: Response, next: NextFunction) => {
  res.removeHeader('X-Powered-By');
  next();
};

const corsOptions = {
  origin: `http://localhost:${ORIGIN_PORT}`,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(json());
  app.use(disablePoweredBy);
};
