const RepositoryDAL = require('../DAL/RepositoryDAL');
const gitCloneRepo = require('../utils/childProcesses/gitCloneRepo');
const deleteSavedStructures = require('../utils/childProcesses/deleteSavedStructures');

const getSettings = async (req, res) => {
  const response = await RepositoryDAL.getRepositorySettings();
  res.send(response);
};

const sendSettings = async (req, res) => {
  gitCloneRepo(req.body.repoName);
  const response = await RepositoryDAL.sendRepositorySettings(req.body);
  res.send(response);
};

const deleteSettings = async (req, res) => {
  deleteSavedStructures.deleteSavedRepository();
  deleteSavedStructures.deleteSavedBuildsLogs();
  const response = await RepositoryDAL.deleteSettings();
  res.send(response);
};

module.exports = {
  getSettings,
  sendSettings,
  deleteSettings,
};
