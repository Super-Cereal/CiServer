declare type NoRepoOrBranchError = {
    name: string;
    message: string;
};
declare type CloneRepoResult = {
    status: 200;
} | {
    data: {
        error: NoRepoOrBranchError;
    };
    status: 500;
};
declare type GitCloneRepoType = (repoName: string, mainBranch: string, buildCommand: string) => Promise<CloneRepoResult>;
declare const gitCloneRepo: GitCloneRepoType;
export default gitCloneRepo;
