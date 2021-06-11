const instance = require('./instance');

const BuildsDAL = {
  getAllBuilds() {
    return instance
      .get('/build/list')
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => ({status: '500', data: err}));
  },
  getBuildDetails(buildId) {
    return instance
      .get(`/build/details?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => ({status: '500', data: err}));
  },
  getBuildLogs(buildId) {
    return instance
      .get(`/build/log?buildId=${buildId}`)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => {
        if (err.message === 'Request failed with status code 400') {
          return {
            status: '400',
            data: {message: 'Wrong buildId or there are no logs on this build'},
          };
        }
        return {
          status: '500',
          data: err,
        };
      });
  },
  addNewBuild(commitData) {
    return instance
      .post('/build/request', commitData)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((err) => ({status: '500', data: err}));
  },
};

module.exports = BuildsDAL;
