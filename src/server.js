const express = require('express');
require('dotenv').config();

const applyMiddlewares = require('./applyMiddlewares');
const {PORT} = require('./config/config');
const {apiRouter} = require('./routers');

const app = express();
applyMiddlewares(app);

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
