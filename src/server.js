const express = require('express');
require('dotenv').config();

const {PORT} = require('./config/config');
const {apiRouter} = require('./routers');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
