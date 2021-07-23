"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors = require("cors");
var config_1 = require("./config/config");
var disablePoweredBy = function (_, res, next) {
    res.removeHeader('X-Powered-By');
    next();
};
var corsOptions = {
    origin: "http://localhost:" + config_1.ORIGIN_PORT,
    credentials: true,
    optionSuccessStatus: 200,
};
module.exports = function (app) {
    app.use(cors(corsOptions));
    app.use(express_1.json());
    app.use(disablePoweredBy);
};
//# sourceMappingURL=applyMiddlewares.js.map