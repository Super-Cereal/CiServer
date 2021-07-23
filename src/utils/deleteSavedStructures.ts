import {exists, deleteDir} from './fs';

const deleteSavedStructures = {
  async deleteSavedRepository() {
    if (await exists('./data/Repository')) {
      await deleteDir('./data/Repository');
    }
    if (await exists('./data/config.txt')) {
      await deleteDir('./data/config.txt');
    }
  },
};

export default deleteSavedStructures;
