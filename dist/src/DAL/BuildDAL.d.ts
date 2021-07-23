declare type SomeError = {
    status: 500;
    data: string;
};
declare type BuildType = {
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
declare type CommitDataType = {
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
};
declare type AddingBuildResult = {
    id: string;
    buildNumber: number;
    status: 'Success' | 'Failed' | 'Waiting';
};
declare type BuildsDALType = {
    getAllBuilds: (offset: string, limit: string) => Promise<SomeError | {
        status: number;
        data: BuildType;
    }>;
    getBuildDetails: (buildId: string) => Promise<SomeError | {
        status: number;
        data: BuildType[];
    }>;
    getBuildLogs: (buildId: string) => Promise<SomeError | {
        status: number;
        data: string;
    }>;
    addNewBuild: (commitData: CommitDataType) => Promise<SomeError | {
        status: number;
        data: AddingBuildResult;
    }>;
};
declare const BuildsDAL: BuildsDALType;
export default BuildsDAL;
