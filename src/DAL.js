const axios = require('axios');

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://shri.yandex/hw/api/',
  headers: {
    Authorization: `Bearer ${process.env.authToken}`,
  },
});

const RepositoryDAL = {
  getRepositorySettings() {
    return instanse
      .get('conf')
      .then((response) => ({status: response.status, ...response.data}));
  },
  sendRepositorySettings(repoSettings) {
    return instanse
      .post('conf', repoSettings)
      .then((response) => ({status: response.status, ...response.data}));
  },
};

const BuildsDAL = {
  getAllBuilds() {
    return instanse
      .get('build/list')
      .then((response) => ({status: response.status, ...response.data}));
  },
  getBuild(buildId) {
    return instanse
      .get(`build/details?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}));
  },
  sendBuild(buildInfo) {
    return instanse
      .post('build/request', buildInfo)
      .then((response) => ({status: response.status, ...response.data}));
  },
  getBuildLogs(buildId) {
    return instanse
      .get(`build/log?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}));
  },
};

module.exports = {
  RepositoryDAL,
  BuildsDAL,
};
