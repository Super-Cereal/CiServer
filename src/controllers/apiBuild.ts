import {Request, Response} from 'express';

import BuildDAL from '../DAL/BuildDAL';
import gitGetCommitData from '../utils/childProcesses/gitGetCommitData';

export const getAllBuilds = async (req: Request, res: Response) => {
  let {offset, limit} = req.query;
  if (!offset || !limit) {
    res.send({status: 500});
    return;
  }

  offset = offset.toString();
  limit = limit.toString();
  const response = await BuildDAL.getAllBuilds(offset, limit);
  res.send(response);
};

export const getBuildDetails = async (req: Request, res: Response) => {
  const response = await BuildDAL.getBuildDetails(req.params.buildId);
  res.send(response);
};

export const getBuildLogs = async (req: Request, res: Response) => {
  const response = await BuildDAL.getBuildLogs(req.params.buildId);
  res.send(response);
};

export const addNewBuild = async (req: Request, res: Response) => {
  const commitDataResponse = await gitGetCommitData(req.params.commitHash);
  if (commitDataResponse.status === 200) {
    const response = await BuildDAL.addNewBuild(commitDataResponse);
    res.send(response);
  }
  res.send(commitDataResponse);
};
