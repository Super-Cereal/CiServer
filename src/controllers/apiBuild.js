const BuildDAL = require('../DAL/BuildDAL');
const gitGetCommitData = require('../utils/childProcesses/gitGetCommitData');

const getAllBuilds = async (req, res) => {
  const response = await BuildDAL.getAllBuilds();
  res.send(response);
};

const getBuildDetails = async (req, res) => {
  const response = await BuildDAL.getBuildDetails(req.params.buildId);
  res.send(response);
};

const getBuildLogs = async (req, res) => {
  const {buildId} = req.params;
  const response = await BuildDAL.getBuildLogs(buildId);
  res.send(response);
};

const addNewBuild = async (req, res) => {
  const commitData = await gitGetCommitData(req.params.commitHash);
  const response = await BuildDAL.addNewBuild(commitData);
  res.send(response);
};

module.exports = {
  getAllBuilds,
  getBuildDetails,
  addNewBuild,
  getBuildLogs,
};
