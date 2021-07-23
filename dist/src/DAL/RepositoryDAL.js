"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var instance_1 = __importDefault(require("./instance"));
var RepositoryDAL = {
    getRepositorySettings: function () {
        return instance_1.default
            .get('/conf')
            .then(function (response) { return ({
            status: response.status,
            data: response.data.data || {},
            haveSettings: !!response.data.data,
        }); })
            .catch(function (error) { return ({ status: 500, data: error }); });
    },
    sendRepositorySettings: function (repoSettings) {
        return instance_1.default
            .post('/conf', repoSettings)
            .then(function (response) { return ({ status: response.status }); })
            .catch(function (error) { return ({ status: 500, data: error }); });
    },
    deleteSettings: function () {
        return instance_1.default
            .delete('/conf')
            .then(function (response) { return ({ status: response.status }); })
            .catch(function (error) { return ({ status: 500, data: error }); });
    },
    sendRepositorySettingsToCiServer: function (_a) {
        var repoName = _a.repoName, buildCommand = _a.buildCommand, mainBranch = _a.mainBranch, period = _a.period;
        return axios_1.default
            .post('http://127.0.0.1:8080/updateRepoSettings', { repoName: repoName, buildCommand: buildCommand, mainBranch: mainBranch, period: period })
            .catch(function () { });
    },
};
exports.default = RepositoryDAL;
//# sourceMappingURL=RepositoryDAL.js.map