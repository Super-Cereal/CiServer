const {exec} = require('child_process');

const {branchDataParser, mainDataParser} = require('../gitCommitDataParser');

module.exports = (commitHash) => {
  const branchDataPromise = new Promise((resolve, reject) => {
    exec(
      `git branch -a --contains ${commitHash}`,
      {cwd: './data/Repository'},
      (err, out) => {
        if (err) {
          reject(err);
        } else {
          resolve(branchDataParser(out));
        }
      },
    );
  });
  const mainDataPromise = new Promise((resolve, reject) => {
    exec(
      `git cat-file commit ${commitHash}`,
      {cwd: './data/Repository'},
      (err, out) => {
        if (err) {
          reject(err);
        } else {
          resolve(mainDataParser(out));
        }
      },
    );
  });
  return Promise.all([branchDataPromise, mainDataPromise]);
};
