import {Request, Response} from 'express';

/* eslint-disable max-len */
import RepositoryDAL from '../DAL/RepositoryDAL';
import gitCloneRepo from '../utils/childProcesses/gitCloneRepo';
import deleteSavedStructures from '../utils/deleteSavedStructures';

export const getSettings = async (_: Request, res: Response) => {
  console.log('GET /settings');
  const response = await RepositoryDAL.getRepositorySettings();
  res.send(response);
};

export const sendSettings = async (req: Request, res: Response) => {
  console.log('POST /settings');
  const cloneResponse = await gitCloneRepo(req.body.repoName, req.body.mainBranch, req.body.buildCommand);
  if (cloneResponse.status !== 200) {
    res.send({status: cloneResponse.status, data: {error: cloneResponse.data.error}});
    return;
  }
  const response = await RepositoryDAL.sendRepositorySettings(req.body);
  RepositoryDAL.sendRepositorySettingsToCiServer(req.body);

  res.send(response);
};

export const deleteSettings = async (_: Request, res: Response) => {
  console.log('DELETE /settings');
  deleteSavedStructures.deleteSavedRepository();
  const response = await RepositoryDAL.deleteSettings();
  res.send(response);
};
