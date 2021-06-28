/* eslint-disable consistent-return */
const {exec} = require('../fs');

module.exports = async () => {
  console.log('started installing requirements');
  console.time('installing requirements');
  await exec('cd ./data/Repository && npm install');
  console.timeEnd('installing requirements');

  return {status: 200};
};
