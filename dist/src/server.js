"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require('dotenv').config();
var applyMiddlewares = require('./applyMiddlewares');
var PORT = require('./config/config').PORT;
var routers_1 = __importDefault(require("./routers"));
var app = express();
applyMiddlewares(app);
app.use('/api', routers_1.default);
app.listen(PORT, function () {
    console.log("Server has started at port " + PORT);
});
//# sourceMappingURL=server.js.map