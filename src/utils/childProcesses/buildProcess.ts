/* eslint-disable consistent-return */
import {exec, getConfigRepoData} from '../fs';

const buildProcess = async () => {
  try {
    const [, , buildCommand] = await getConfigRepoData();

    console.log('build started');
    console.time('builded');
    const response = await exec(`cd data/Repository && ${buildCommand}`);
    console.timeEnd('builded');

    if (!response) {
      return {status: 501, data: 'no logs from your build command'};
    } else if (response.stderr) {
      return {status: 501, data: response.stderr};
    }
    return {status: 200, data: response.stdout};
  } catch (e) {
    return {status: 501, data: e};
  }
};

export default buildProcess;
