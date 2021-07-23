/* eslint-disable consistent-return */
import deleteSavedStructures from '../deleteSavedStructures';
import {exec, getConfigRepoData, writeConfigRepoData} from '../fs';

type NoRepoOrBranchError = {name: string; message: string};

type CheckRepoNBranchExistanceType = (repoName: string, mainBranch: string) => Promise<[boolean, NoRepoOrBranchError]>;

type CloneRepoResult = {status: 200} | {data: {error: NoRepoOrBranchError}; status: 500};
type GitCloneRepoType = (repoName: string, mainBranch: string, buildCommand: string) => Promise<CloneRepoResult>;

const checkRepoNBranchExistance: CheckRepoNBranchExistanceType = async (repoName, mainBranch) => {
  const response = await exec(`git ls-remote --heads ${repoName} ${mainBranch}`);
  if (response?.stderr) return [false, {name: 'repoName', message: 'This repository is unavailable'}];
  return [!!response?.stdout, {name: 'mainBranch', message: 'This branch is unavailable'}];
};

const gitCloneRepo: GitCloneRepoType = async (repoName, mainBranch, buildCommand) => {
  const [isExists, error] = await checkRepoNBranchExistance(repoName, mainBranch);
  if (!isExists) {
    console.log('Репозитория или ветки не существует');
    return {status: 500, data: {error}};
  }

  const configData = await getConfigRepoData();
  if (configData.length && configData[0] === repoName) {
    writeConfigRepoData(repoName, mainBranch, buildCommand);
    return {status: 200};
  }

  await deleteSavedStructures.deleteSavedRepository();
  console.log(`started cloning ${repoName}`);
  console.time('cloned');
  await exec(`git clone ${repoName} ./data/Repository`);
  console.timeEnd('cloned');

  writeConfigRepoData(repoName, mainBranch, buildCommand);
  return {status: 200};
};

export default gitCloneRepo;
