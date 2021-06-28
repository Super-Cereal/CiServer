const BuildDAL = require('../DAL/BuildDAL');
const gitGetCommitData = require('../utils/childProcesses/gitGetCommitData');

const getAllBuilds = async (req, res) => {
  const {offset, limit} = req.query;
  const response = await BuildDAL.getAllBuilds(offset, limit);
  res.send(response);
};

const getBuildDetails = async (req, res) => {
  const response = await BuildDAL.getBuildDetails(req.params.buildId);
  res.send(response);
};

const getBuildLogs = async (req, res) => {
  const response = await BuildDAL.getBuildLogs(req.params.buildId);
  res.send(response);
};

const addNewBuild = async (req, res) => {
  let response = await gitGetCommitData(req.params.commitHash);
  if (response.status === 200) {
    response = await BuildDAL.addNewBuild(response);
  }
  res.send(response);
};

module.exports = {
  getAllBuilds,
  getBuildDetails,
  addNewBuild,
  getBuildLogs,
};
