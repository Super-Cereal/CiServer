const RepositoryDAL = require('../DAL/RepositoryDAL');
const gitCloneRepo = require('../utils/childProcesses/gitCloneRepo');
const deleteSavedStructures = require('../utils/deleteSavedStructures');

let lastRepoName = '';
let lastMainBranch = '';

const getSettings = async (_, res) => {
  const response = await RepositoryDAL.getRepositorySettings();
  res.send(response);
};

const sendSettings = async (req, res) => {
  if (
    lastRepoName !== req.body.repoName ||
    lastMainBranch !== req.body.mainBranch
  ) {
    await gitCloneRepo(req.body.repoName, req.body.mainBranch);
  }
  lastRepoName = req.body.repoName;
  lastMainBranch = req.body.mainBranch;
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
