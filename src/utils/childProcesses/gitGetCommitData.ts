import {exec} from 'child_process';

type CommitDataResult =
  | {
      commitHash: string;
      branchName: string;
      authorName: string;
      commitMessage: string;
      status: 200;
    }
  | {data: any; status: 500};
type GitGetCommitDataType = (commitHash: string) => Promise<CommitDataResult>;

type CommitDataPromiseType = (commitHash: string) => Promise<string>;

const replaceAll = (text: string, from: string, to: string) => text.split(from).join(to);

const branchDataPromise: CommitDataPromiseType = (commitHash) =>
  new Promise((resolve, reject) => {
    exec(`git name-rev --name-only ${commitHash}`, {cwd: './data/Repository'}, (err, out) => {
      if (err) {
        reject(err);
      } else {
        resolve(out.split('~')[0]);
      }
    });
  });
const authorNameDataPromise: CommitDataPromiseType = (commitHash) =>
  new Promise((resolve, reject) => {
    const grep = process.platform === 'win32' ? 'findstr' : 'grep';
    exec(`git cat-file commit ${commitHash} | ${grep} -i author`, {cwd: './data/Repository'}, (err, out) => {
      if (err) {
        reject(err);
      } else {
        const x = out.indexOf(' ');
        const text = out.slice(x + 1, out.indexOf(' ', x + 1));
        resolve(replaceAll(text, '\n', ''));
      }
    });
  });
const commitMessageDataPromise: CommitDataPromiseType = (commitHash) =>
  new Promise((resolve, reject) => {
    exec(`git log --format=%B -n 1 ${commitHash}`, {cwd: './data/Repository'}, (err, out) => {
      if (err) {
        reject(err);
      } else {
        resolve(replaceAll(out, '\n', ''));
      }
    });
  });

const gitGetCommitData: GitGetCommitDataType = async (commitHash) => {
  // eslint-disable-next-line max-len
  try {
    const res = await Promise.all([
      branchDataPromise(commitHash),
      authorNameDataPromise(commitHash),
      commitMessageDataPromise(commitHash),
    ]);
    return {
      commitHash: commitHash.slice(0, 7),
      branchName: res[0],
      authorName: res[1],
      commitMessage: res[2],
      status: 200,
    };
  } catch (err) {
    return {status: 500, data: err};
  }
};

export default gitGetCommitData;
