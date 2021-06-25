const fsUtils = require('./fs');

const deleteSavedStructures = {
  async deleteSavedRepository() {
    if (await fsUtils.exists('./data/Repository')) {
      await fsUtils.deleteDir('./data/Repository');
    }
    if (await fsUtils.exists('./data/config.txt')) {
      await fsUtils.deleteDir('./data/config.txt');
    }
  },
};

module.exports = deleteSavedStructures;
