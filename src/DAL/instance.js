const axios = require('axios');

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://shri.yandex/hw/api/',
  headers: {
    Authorization: `Bearer ${process.env.authToken}`,
  },
});

module.exports = instance;
