const fsUtils = require('../fs');

const deleteSavedStructures = {
  async deleteSavedRepository() {
    if (await fsUtils.exists('./data/Repository')) {
      await fsUtils.deleteDir('./data/Repository');
      return true;
    }
    return false;
  },
  async deleteSavedBuildsLogs() {
    if (await fsUtils.exists('./data/Builds/logs')) {
      await fsUtils.deleteDir('./data/Builds/logs');
      return true;
    }
    return false;
  },
};

module.exports = deleteSavedStructures;
