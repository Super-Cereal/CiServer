import axios, {AxiosResponse} from 'axios';

import instance from './instance';

type SomeError = {status: 500; data: string};

type SettingsWithId = {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: 10;
};
type Settings = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: 10;
};

type RepositoryDALType = {
  getRepositorySettings: () => Promise<SomeError | {status: number; data: SettingsWithId | {}; haveSettings: boolean}>;
  sendRepositorySettings: (repoSettings: Settings) => Promise<SomeError | {status: number}>;
  deleteSettings: () => Promise<SomeError | {status: number}>;
  sendRepositorySettingsToCiServer: (repoSettings: Settings) => Promise<void | AxiosResponse<any>>;
};

const RepositoryDAL: RepositoryDALType = {
  getRepositorySettings() {
    return instance
      .get('/conf')
      .then((response) => ({
        status: response.status,
        data: response.data.data || {},
        haveSettings: !!response.data.data,
      }))
      .catch((error) => ({status: 500, data: error}));
  },
  sendRepositorySettings(repoSettings) {
    return instance
      .post('/conf', repoSettings)
      .then((response) => ({status: response.status}))
      .catch((error) => ({status: 500, data: error}));
  },
  deleteSettings() {
    return instance
      .delete('/conf')
      .then((response) => ({status: response.status}))
      .catch((error) => ({status: 500, data: error}));
  },
  sendRepositorySettingsToCiServer({repoName, buildCommand, mainBranch, period}) {
    return axios
      .post('http://127.0.0.1:8080/updateRepoSettings', {repoName, buildCommand, mainBranch, period})
      .catch(() => {});
  },
};

export default RepositoryDAL;
