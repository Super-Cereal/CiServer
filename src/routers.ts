import {Router} from 'express';

const {getSettings, sendSettings, deleteSettings} = require('./controllers/apiSettings');
const {getAllBuilds, getBuildDetails, addNewBuild, getBuildLogs} = require('./controllers/apiBuild');
// const cacheBuildLogs = require('./utils/cacheBuildLogs');

const apiRouter = Router();

apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', sendSettings);
apiRouter.delete('/settings', deleteSettings);

apiRouter.get('/builds', getAllBuilds);
apiRouter.get('/builds/:buildId', getBuildDetails);
// apiRouter.get('/builds/:buildId/logs', cacheBuildLogs(32), getBuildLogs);
apiRouter.get('/builds/:buildId/logs', getBuildLogs);
apiRouter.post('/builds/:commitHash', addNewBuild);

export default apiRouter;
