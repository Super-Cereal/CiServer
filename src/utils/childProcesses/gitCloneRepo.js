const {exec} = require('child_process');
const deleteSavedStructures = require('../deleteSavedStructures');

module.exports = async (repoName) => {
  await deleteSavedStructures.deleteSavedRepository();
  exec(
    `git clone --no-checkout --bare --filter=blob:none ${repoName} ./data/Repository`,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('cloned');
      }
    },
  );
};
