/* eslint-disable max-len */
const RepositoryDAL = require('../DAL/RepositoryDAL');
const gitCloneRepo = require('../utils/childProcesses/gitCloneRepo');
const deleteSavedStructures = require('../utils/deleteSavedStructures');
const gitInstallRepoRequirements = require('../utils/childProcesses/gitInstallRepoRequirements');
const processesForExec = require('../utils/processesForExec');

const getSettings = async (_, res) => {
  const response = await RepositoryDAL.getRepositorySettings();
  res.send(response);
};

const sendSettings = async (req, res) => {
  // благодаря этому установка зависимостей и
  // последующие билды будут вставать в очередь
  // за клонированием репозитория и не будут ломать сервер
  const gitCloneRepoPromise = gitCloneRepo(req.body.repoName, req.body.mainBranch, req.body.buildCommand);
  processesForExec.push({func: () => gitCloneRepoPromise});
  processesForExec.push({func: gitInstallRepoRequirements});

  const {status, data} = await gitCloneRepoPromise;
  if (status !== 200) {
    res.send({status, data: {error: data.error}});
    return;
  }
  const response = await RepositoryDAL.sendRepositorySettings(req.body);
  res.send(response);
};

const deleteSettings = async (_, res) => {
  deleteSavedStructures.deleteSavedRepository();
  const response = await RepositoryDAL.deleteSettings();
  res.send(response);
};

module.exports = {
  getSettings,
  sendSettings,
  deleteSettings,
};
