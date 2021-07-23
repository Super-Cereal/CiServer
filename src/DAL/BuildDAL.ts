/* eslint-disable no-return-await */
import axios from 'axios';

import instance from './instance';

type SomeError = {status: 500; data: string};

type BuildType = {
  buildNumber: number;
  status: 'Success' | 'Failed' | 'Waiting';
  commitMessage: string;
  branchName: string;
  commitHash: string;
  authorName: string;
  start?: string;
  duration?: number;
  id: string;
};

type CommitDataType = {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
};

type AddingBuildResult = {id: string; buildNumber: number; status: 'Success' | 'Failed' | 'Waiting'};

type BuildsDALType = {
  getAllBuilds: (offset: string, limit: string) => Promise<SomeError | {status: number; data: BuildType}>;
  getBuildDetails: (buildId: string) => Promise<SomeError | {status: number; data: BuildType[]}>;
  getBuildLogs: (buildId: string) => Promise<SomeError | {status: number; data: string}>;
  addNewBuild: (commitData: CommitDataType) => Promise<SomeError | {status: number; data: AddingBuildResult}>;
};

const BuildsDAL: BuildsDALType = {
  getAllBuilds(offset, limit) {
    const offsetParam = offset ? `offset=${offset}` : '';
    const limitParam = limit ? `limit=${limit}` : '';
    return instance
      .get(`/build/list?${offsetParam}&${limitParam}`)
      .then((response) => ({status: response.status, data: response.data.data}))
      .catch((err) => ({status: 500, data: err}));
  },
  getBuildDetails(buildId) {
    return instance
      .get(`/build/details?buildId=${buildId}`)
      .then((response) => ({status: response.status, data: response.data.data}))
      .catch((err) => ({status: 500, data: err}));
  },
  getBuildLogs(buildId) {
    return instance
      .get(`/build/log?buildId=${buildId}`)
      .then((response) => ({
        status: response.status,
        data: response.data,
      }))
      .catch((err) => ({status: 500, data: err}));
  },
  async addNewBuild(commitData) {
    const response = await instance
      .post('/build/request', commitData)
      .then((res) => ({status: res.status, data: res.data.data}))
      .catch((err) => ({status: 500, data: err}));
    if (response.status === 200) {
      axios
        .post('http://127.0.0.1:8080/startBuild', {buildId: response.data.id, commitHash: commitData.commitHash})
        .catch(() => {});
    }
    return response;
  },
};

export default BuildsDAL;
