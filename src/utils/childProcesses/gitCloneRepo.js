/* eslint-disable consistent-return */
const util = require('util');
const deleteSavedStructures = require('../deleteSavedStructures');
const {readFile, writeFile} = require('../fs');
const execAsync = util.promisify(require('child_process').exec);

const exec = async (command) => {
  try {
    await execAsync(command);
  } catch (err) {
    return err;
  }
};

module.exports = async (repoName, mainBranch, buildCommand) => {
  const response = (await readFile('./data/config.txt')).split(';$;');
  if (response && response[0] === repoName) {
    writeFile(
      './data/config.txt',
      `${repoName};$;${mainBranch};$;${buildCommand}`,
    );
    return;
  }
  await deleteSavedStructures.deleteSavedRepository();
  console.time('cloning');
  const err = await exec(
    `git clone --branch=${mainBranch} ${repoName} ./data/Repository`,
  );
  console.timeEnd('cloning');
  if (err) {
    return {status: 500, error: err};
  }
  writeFile(
    './data/config.txt',
    `${repoName};$;${mainBranch};$;${buildCommand}`,
  );
  return {status: 200};
};
