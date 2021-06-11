const BuildDAL = require('../DAL/BuildDAL');
const gitGetCommitData = require('../utils/childProcesses/gitGetCommitData');

const getAllBuilds = async (req, res) => {
  const response = await BuildDAL.getAllBuilds();
  res.send(response);
};

const getBuildDetails = async (req, res) => {
  const {buildId} = req.params;
  const response = await BuildDAL.getBuildDetails(buildId);
  res.send(response);
};

const getBuildLogs = async (req, res) => {
  const {buildId} = req.params;
  let response = null;
  if (true) {
    response = await BuildDAL.getBuildLogs(buildId);
  } else {
    console.log(1);
  }
  res.send(response);
};

const addNewBuild = async (req, res) => {
  const {commitHash} = req.params;
  const gitCommitData = await gitGetCommitData(commitHash);
  const commitData = {
    commitHash,
    ...gitCommitData[0],
    ...gitCommitData[1],
  };
  const response = await BuildDAL.addNewBuild(commitData);
  res.send(response);
};

module.exports = {
  getAllBuilds,
  getBuildDetails,
  addNewBuild,
  getBuildLogs,
};
