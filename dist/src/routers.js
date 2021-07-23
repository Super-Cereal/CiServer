"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _a = require('./controllers/apiSettings'), getSettings = _a.getSettings, sendSettings = _a.sendSettings, deleteSettings = _a.deleteSettings;
var _b = require('./controllers/apiBuild'), getAllBuilds = _b.getAllBuilds, getBuildDetails = _b.getBuildDetails, addNewBuild = _b.addNewBuild, getBuildLogs = _b.getBuildLogs;
// const cacheBuildLogs = require('./utils/cacheBuildLogs');
var apiRouter = express_1.Router();
apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', sendSettings);
apiRouter.delete('/settings', deleteSettings);
apiRouter.get('/builds', getAllBuilds);
apiRouter.get('/builds/:buildId', getBuildDetails);
// apiRouter.get('/builds/:buildId/logs', cacheBuildLogs(32), getBuildLogs);
apiRouter.get('/builds/:buildId/logs', getBuildLogs);
apiRouter.post('/builds/:commitHash', addNewBuild);
exports.default = apiRouter;
//# sourceMappingURL=routers.js.map