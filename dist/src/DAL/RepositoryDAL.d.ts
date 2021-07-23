import { AxiosResponse } from 'axios';
declare type SomeError = {
    status: 500;
    data: string;
};
declare type SettingsWithId = {
    id: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: 10;
};
declare type Settings = {
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: 10;
};
declare type RepositoryDALType = {
    getRepositorySettings: () => Promise<SomeError | {
        status: number;
        data: SettingsWithId | {};
        haveSettings: boolean;
    }>;
    sendRepositorySettings: (repoSettings: Settings) => Promise<SomeError | {
        status: number;
    }>;
    deleteSettings: () => Promise<SomeError | {
        status: number;
    }>;
    sendRepositorySettingsToCiServer: (repoSettings: Settings) => Promise<void | AxiosResponse<any>>;
};
declare const RepositoryDAL: RepositoryDALType;
export default RepositoryDAL;
