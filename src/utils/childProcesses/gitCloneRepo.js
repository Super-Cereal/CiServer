/* eslint-disable consistent-return */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const deleteSavedStructures = require('../deleteSavedStructures');

module.exports = async (repoName) => {
  await deleteSavedStructures.deleteSavedRepository();
  console.time('cloning');
  const err = await exec(`git clone ${repoName} ./data/Repository`);
  console.timeEnd('cloning');
  if (err) {
    return {status: 500, error: err};
  }
  return {status: 200};
};
