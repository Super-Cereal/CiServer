/* eslint-disable consistent-return */
const {exec, getConfigRepoData} = require('../fs');

module.exports = async () => {
  const [, , buildCommand] = await getConfigRepoData();

  console.log('build started');
  console.time('building');
  const response = await exec(`cd data/Repository && ${buildCommand}`);
  console.timeEnd('building');

  if (response.stderr) {
    return {status: 501, data: response.stderr};
  }
  return {status: 200, data: response.stdout};
};
