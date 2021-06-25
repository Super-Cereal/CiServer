const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);

module.exports = {
  writeFile: async (path, content) => {
    console.time('writingFile');
    await writeFileAsync(path, content, {encoding: 'utf-8'});
    console.timeEnd('writingFile');
  },
  readFile: async (path) => {
    try {
      const response = await readFileAsync(path, {encoding: 'utf-8'});
      return response;
    } catch (err) {
      return '';
    }
  },
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
};
