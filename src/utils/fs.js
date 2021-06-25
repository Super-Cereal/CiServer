const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);

const execAsync = util.promisify(require('child_process').exec);

const readFile = async (path) => {
  try {
    const response = await readFileAsync(path, {encoding: 'utf-8'});
    return response;
  } catch (err) {
    return '';
  }
};

const writeFile = async (path, content) => {
  await writeFileAsync(path, content, {encoding: 'utf-8'});
};

module.exports = {
  writeFile,
  readFile,
  deleteDir: async (path) => {
    try {
      await removeDirAsync(path, {
        recursive: true,
        force: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
  exists: (path) => existsAsync(path),
  getConfigRepoData: async () => (await readFile('./data/config.txt')).split(';$;'),
  writeConfigRepoData: async (repoName, mainBranch, buildCommand) => {
    writeFile('./data/config.txt', `${repoName};$;${mainBranch};$;${buildCommand}`);
  },
  exec: async (command) => {
    try {
      return await execAsync(command);
    } catch (err) {
      return err;
    }
  },
};
