const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);

module.exports = {
  writeFile: async (path, content) => {
    await writeFileAsync(path, content, {encoding: 'utf-8'});
  },

  deleteDir: async (path) => {
    try {
      await removeDirAsync(path, {recursive: true, force: true, retryDelay: 500});
    } catch (err) {
      console.log(err);
    }
  },

  exists: async (path) => {
    const isExists = await existsAsync(path);
    return isExists;
  },
};