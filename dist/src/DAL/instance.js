"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var instance = axios_1.default.create({
    withCredentials: true,
    baseURL: 'https://shri.yandex/hw/api/',
    headers: {
        Authorization: "Bearer " + process.env.authToken,
    },
});
exports.default = instance;
//# sourceMappingURL=instance.js.map