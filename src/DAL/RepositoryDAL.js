const instance = require('./instance');

const RepositoryDAL = {
  getRepositorySettings() {
    return instance
      .get('/conf')
      .then((response) => ({status: response.status, ...response.data}));
  },
  sendRepositorySettings(repoSettings) {
    return instance
      .post('/conf', repoSettings)
      .then((response) => ({status: response.status, ...response.data}));
  },
  deleteSettings() {
    return instance
      .delete('/conf')
      .then((response) => ({status: response.status}));
  },
};

module.exports = RepositoryDAL;
