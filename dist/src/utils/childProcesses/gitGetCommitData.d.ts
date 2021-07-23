declare type CommitDataResult = {
    commitHash: string;
    branchName: string;
    authorName: string;
    commitMessage: string;
    status: 200;
} | {
    data: any;
    status: 500;
};
declare type GitGetCommitDataType = (commitHash: string) => Promise<CommitDataResult>;
declare const gitGetCommitData: GitGetCommitDataType;
export default gitGetCommitData;
