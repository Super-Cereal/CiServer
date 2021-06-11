const {exec} = require('child_process');
const deleteSavedStructures = require('./deleteSavedStructures');

module.exports = async (repoName) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  await deleteSavedStructures.deleteSavedRepository();
  exec(`git clone ${repoName} ./data/Repository`, (err, out) => {
    if (err) {
      console.error(err);
    } else {
      console.log(out);
    }
  });
};
