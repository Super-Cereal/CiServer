import fs = require('fs');
import util = require('util');

import child_process = require('child_process');

type ExecType = (command: string) => Promise<void | {stdout: string; stderr: string}>;
type ReadFileType = (path: string) => Promise<string>;
type WriteFileType = (path: string, content: string | NodeJS.ArrayBufferView) => Promise<void>;
type DeleteDirType = (path: string) => Promise<void>;
type ExistsType = (path: string) => Promise<boolean>;
type WriteConfigRepoDataType = (repoName: string, mainBranch: string, buildCommand: string) => Promise<void>;

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);
const execAsync = util.promisify(child_process.exec);

export const exec: ExecType = (command) => execAsync(command).catch(() => console.log('exec прошел неуспешно'));

export const readFile: ReadFileType = (path) => readFileAsync(path, {encoding: 'utf-8'}).catch(() => '');

export const writeFile: WriteFileType = (path, content) =>
  writeFileAsync(path, content, {encoding: 'utf-8'}).catch(() => console.log('writeFile прошел неуспешно'));

export const deleteDir: DeleteDirType = (path) =>
  removeDirAsync(path, {
    recursive: true,
    force: true,
  }).catch(() => console.log('deleteDir прошел неуспешно'));

export const exists: ExistsType = (path) => existsAsync(path);

export const getConfigRepoData = () => readFile('./data/config.txt').then((r) => r.split(';$;'));

export const writeConfigRepoData: WriteConfigRepoDataType = (repoName, mainBranch, buildCommand) =>
  writeFile('./data/config.txt', `${repoName};$;${mainBranch};$;${buildCommand}`);

const fsUtils = {exec, readFile, writeFile, deleteDir, exists, getConfigRepoData, writeConfigRepoData};
export default fsUtils;
