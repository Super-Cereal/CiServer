/* eslint-disable consistent-return */
const deleteSavedStructures = require('../deleteSavedStructures');
const {exec, getConfigRepoData, writeConfigRepoData} = require('../fs');

const checkRepoNBranchExistance = async (repoName, mainBranch) => {
  const response = await exec(`git ls-remote --heads ${repoName} ${mainBranch}`);
  if (response.stderr) return [false, {name: 'repoName', message: 'This repository is unavailable'}];
  return [!!response.stdout, {name: 'mainBranch', message: 'This branch is unavailable'}];
};

module.exports = async (repoName, mainBranch, buildCommand) => {
  const [isExists, error] = await checkRepoNBranchExistance(repoName, mainBranch);
  if (!isExists) {
    return {status: 500, data: {error}};
  }

  const configData = await getConfigRepoData();
  if (configData && configData[0] === repoName) {
    writeConfigRepoData(repoName, mainBranch, buildCommand);
    return {status: 200};
  }

  await deleteSavedStructures.deleteSavedRepository();
  console.log('started cloning');
  console.time('cloned');
  await exec(`git clone ${repoName} ./data/Repository`);
  console.timeEnd('cloned');

  writeConfigRepoData(repoName, mainBranch, buildCommand);
  return {status: 200};
};
