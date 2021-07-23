"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var replaceAll = function (text, from, to) { return text.split(from).join(to); };
var branchDataPromise = function (commitHash) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec("git name-rev --name-only " + commitHash, { cwd: './data/Repository' }, function (err, out) {
            if (err) {
                reject(err);
            }
            else {
                resolve(out.split('~')[0]);
            }
        });
    });
};
var authorNameDataPromise = function (commitHash) {
    return new Promise(function (resolve, reject) {
        var grep = process.platform === 'win32' ? 'findstr' : 'grep';
        child_process_1.exec("git cat-file commit " + commitHash + " | " + grep + " -i author", { cwd: './data/Repository' }, function (err, out) {
            if (err) {
                reject(err);
            }
            else {
                var x = out.indexOf(' ');
                var text = out.slice(x + 1, out.indexOf(' ', x + 1));
                resolve(replaceAll(text, '\n', ''));
            }
        });
    });
};
var commitMessageDataPromise = function (commitHash) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec("git log --format=%B -n 1 " + commitHash, { cwd: './data/Repository' }, function (err, out) {
            if (err) {
                reject(err);
            }
            else {
                resolve(replaceAll(out, '\n', ''));
            }
        });
    });
};
var gitGetCommitData = function (commitHash) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all([
                        branchDataPromise(commitHash),
                        authorNameDataPromise(commitHash),
                        commitMessageDataPromise(commitHash),
                    ])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, {
                        commitHash: commitHash.slice(0, 7),
                        branchName: res[0],
                        authorName: res[1],
                        commitMessage: res[2],
                        status: 200,
                    }];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, { status: 500, data: err_1 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = gitGetCommitData;
//# sourceMappingURL=gitGetCommitData.js.map