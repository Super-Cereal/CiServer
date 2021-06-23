const instance = require('./instance');

const RepositoryDAL = {
  getRepositorySettings() {
    return instance
      .get('/conf')
      .then((response) => ({
        status: response.status,
        data: response.data.data || {},
        haveSettings: !!response.data.data,
      }))
      .catch((error) => ({status: 500, data: error}));
  },
  sendRepositorySettings(repoSettings) {
    return instance
      .post('/conf', repoSettings)
      .then((response) => ({status: response.status, ...response.data}))
      .catch((error) => {
        console.log(error);
      });
  },
  deleteSettings() {
    return instance
      .delete('/conf')
      .then((response) => ({status: response.status}))
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = RepositoryDAL;
