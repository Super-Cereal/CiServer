const instance = require('./instance');

const BuildsDAL = {
  getAllBuilds(offset, limit) {
    const offsetParam = offset ? `offset=${offset}` : '';
    const limitParam = limit ? `limit=${limit}` : '';
    return instance
      .get(`/build/list?${offsetParam}&${limitParam}`)
      .then((response) => ({status: response.status, data: response.data.data}))
      .catch((err) => ({status: 500, data: err}));
  },
  getBuildDetails(buildId) {
    return instance
      .get(`/build/details?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => ({status: 500, data: err}));
  },
  getBuildLogs(buildId) {
    return instance
      .get(`/build/log?buildId=${buildId}`)
      .then((response) => ({
        status: response.status,
        data: response.data,
      }))
      .catch((err) => ({status: 500, data: err}));
  },
  addNewBuild(commitData) {
    return instance
      .post('/build/request', commitData)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => ({status: 500, data: err}));
  },
};

module.exports = BuildsDAL;
