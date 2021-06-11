const instance = require('./instance');

const BuildsDAL = {
  getAllBuilds() {
    return instance
      .get('/build/list')
      .then((response) => ({status: response.status, ...response.data}));
  },
  getBuildDetails(buildId) {
    return instance
      .get(`/build/details?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}));
  },
  addNewBuild(commitData) {
    return instance
      .post('/build/request', commitData)
      .then((response) => ({status: response.status, ...response.data}));
  },
  getBuildLogs(buildId) {
    return instance
      .get(`/build/log?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}));
  },
};

module.exports = BuildsDAL;
