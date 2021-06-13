const {Router} = require('express');

const {
  getSettings,
  sendSettings,
  deleteSettings,
} = require('./controllers/apiSettings');
const {
  getAllBuilds,
  getBuildDetails,
  addNewBuild,
  getBuildLogs,
} = require('./controllers/apiBuild');
const cacheBuildLogs = require('./utils/cacheBuildLogs');

const apiRouter = new Router();

apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', sendSettings);
apiRouter.delete('/settings', deleteSettings);

apiRouter.get('/builds', getAllBuilds);
apiRouter.get('/builds/:buildId', getBuildDetails);
apiRouter.get('/builds/:buildId/logs', cacheBuildLogs(32), getBuildLogs);
apiRouter.post('/builds/:commitHash', addNewBuild);

module.exports = {apiRouter};
