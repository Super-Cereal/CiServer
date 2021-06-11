const {Router} = require('express');

const {getSettings, sendSettings, deleteSettings} = require('./controllers/apiSettings');
const {getAllBuilds, getBuildDetails, addNewBuild, getBuildLogs} = require('./controllers/apiBuild');

const apiRouter = new Router();

apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', sendSettings);
apiRouter.delete('/settings', deleteSettings);

apiRouter.get('/builds', getAllBuilds);
apiRouter.post('/builds/:commitHash', addNewBuild);
apiRouter.get('/builds/:buildId', getBuildDetails);
apiRouter.get('/builds/:buildId/logs', getBuildLogs);

module.exports = {apiRouter};
