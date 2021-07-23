"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeConfigRepoData = exports.getConfigRepoData = exports.exists = exports.deleteDir = exports.writeFile = exports.readFile = exports.exec = void 0;
var fs = require("fs");
var util = require("util");
var child_process = require("child_process");
var writeFileAsync = util.promisify(fs.writeFile);
var readFileAsync = util.promisify(fs.readFile);
var removeDirAsync = util.promisify(fs.rm);
var existsAsync = util.promisify(fs.exists);
var execAsync = util.promisify(child_process.exec);
var exec = function (command) { return execAsync(command).catch(function () { return console.log('exec прошел неуспешно'); }); };
exports.exec = exec;
var readFile = function (path) { return readFileAsync(path, { encoding: 'utf-8' }).catch(function () { return ''; }); };
exports.readFile = readFile;
var writeFile = function (path, content) {
    return writeFileAsync(path, content, { encoding: 'utf-8' }).catch(function () { return console.log('writeFile прошел неуспешно'); });
};
exports.writeFile = writeFile;
var deleteDir = function (path) {
    return removeDirAsync(path, {
        recursive: true,
        force: true,
    }).catch(function () { return console.log('deleteDir прошел неуспешно'); });
};
exports.deleteDir = deleteDir;
var exists = function (path) { return existsAsync(path); };
exports.exists = exists;
var getConfigRepoData = function () { return exports.readFile('./data/config.txt').then(function (r) { return r.split(';$;'); }); };
exports.getConfigRepoData = getConfigRepoData;
var writeConfigRepoData = function (repoName, mainBranch, buildCommand) {
    return exports.writeFile('./data/config.txt', repoName + ";$;" + mainBranch + ";$;" + buildCommand);
};
exports.writeConfigRepoData = writeConfigRepoData;
var fsUtils = { exec: exports.exec, readFile: exports.readFile, writeFile: exports.writeFile, deleteDir: exports.deleteDir, exists: exports.exists, getConfigRepoData: exports.getConfigRepoData, writeConfigRepoData: exports.writeConfigRepoData };
exports.default = fsUtils;
//# sourceMappingURL=fs.js.map