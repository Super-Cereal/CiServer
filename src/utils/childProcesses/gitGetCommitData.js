const {exec} = require('child_process');

module.exports = async (commitHash) => {
  const branchDataPromise = new Promise((resolve, reject) => {
    exec(
      `git name-rev --name-only ${commitHash}`,
      {cwd: './data/Repository'},
      (err, out) => {
        if (err) {
          reject(err);
        } else {
          resolve(out.split('~')[0]);
        }
      },
    );
  });
  const authorNameDataPromise = new Promise((resolve, reject) => {
    const grep = process.platform === 'win32' ? 'findstr' : 'grep';
    exec(
      `git cat-file commit ${commitHash} | ${grep} -i author`,
      {cwd: './data/Repository'},
      (err, out) => {
        if (err) {
          reject(err);
        } else {
          const x = out.indexOf(' ');
          console.log(out);
          resolve(out.slice(x + 1, out.indexOf(' ', x + 1)).replaceAll('\n', ''));
        }
      },
    );
  });
  const commitMessageDataPromise = new Promise((resolve, reject) => {
    exec(
      `git log --format=%B -n 1 ${commitHash}`,
      {cwd: './data/Repository'},
      (err, out) => {
        if (err) {
          reject(err);
        } else {
          resolve(out.replaceAll('\n', ''));
        }
      },
    );
  });
  const commitData = await Promise.all([
    branchDataPromise,
    authorNameDataPromise,
    commitMessageDataPromise,
  ])
    .then((res) => ({
      commitHash: commitHash.slice(0, 7),
      branchName: res[0],
      authorName: res[1],
      commitMessage: res[2],
    }))
    .catch((err) => {
      console.log(err);
    });
  return commitData;
};
