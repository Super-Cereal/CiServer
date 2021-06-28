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
  // eslint-disable-next-line max-len
  const {status, data} = await gitCloneRepo(req.body.repoName, req.body.mainBranch, req.body.buildCommand);
  if (status !== 200) {
    res.send({status, data: {error: data.error}});
    return;
  }
  processesForExec.push({func: gitInstallRepoRequirements});
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
