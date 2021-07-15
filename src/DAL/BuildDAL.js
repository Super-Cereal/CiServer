/* eslint-disable no-return-await */
const axios = require('axios');

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
      .then((response) => ({status: response.status, data: response.data.data}))
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
  async addNewBuild(commitData) {
    const response = await instance
      .post('/build/request', commitData)
      .then((res) => ({status: res.status, data: res.data.data}))
      .catch((err) => ({status: 500, data: err}));
    if (response.status === 200) {
      axios.post('http://127.0.0.1:8080/startBuild', {buildId: response.data.id, commitHash: commitData.commitHash}).catch(() => {});
    }
    return response;
  },
};

module.exports = BuildsDAL;
