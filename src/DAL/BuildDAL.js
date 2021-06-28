/* eslint-disable no-return-await */
const instance = require('./instance');
const build = require('../utils/childProcesses/buildProcess');
const processesForExec = require('../utils/processesForExec');

const asyncBuildFunction = async (buildInfo) => {
  const start = new Date();
  await instance.post('/build/start', {
    buildId: buildInfo.data.id,
    dateTime: start.toISOString(),
  });
  const response = await build();
  const finish = new Date();
  const data = {
    buildId: buildInfo.data.id,
    duration: finish - start,
    success: response.status === 200,
    buildLog: response.data,
  };
  return instance.post('/build/finish', data);
};

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
      processesForExec.push({
        commitHash: commitData.commitHash,
        data: response.data,
        func: () => asyncBuildFunction(response),
      });
    }
    return response;
  },
};

module.exports = BuildsDAL;
