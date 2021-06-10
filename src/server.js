const express = require('express');
require('dotenv').config();

const {PORT} = require('./config/config');
const {RepositoryDAL, BuildsDAL} = require('./DAL');

const app = express();
app.use(express.json());
// app.use('/files', express.static(staticFolder));

app.get('/api/settings', async (req, res) => {
  const response = await RepositoryDAL.getRepositorySettings();
  res.send(response);
});

app.post('/api/settings', async (req, res) => {
  const response = await RepositoryDAL.sendRepositorySettings(req.body);
  res.send(response);
});

app.get('/api/builds', async (req, res) => {
  const response = await BuildsDAL.getAllBuilds();
  res.send(response);
});

app.get('/api/builds/:commitHash', async (req, res) => {
  // ..................найти id сборки по хэшу......................
  const buildId = req.params.commitHash;
  const response = await BuildsDAL.getBuild(buildId);
  res.send(response);
});

app.post('/api/builds:commitHash', async (req, res) => {
  const commitData = {
    commitHash: req.params.commitHash,
  };
  //
  // ..........найти данные комита...........
  //
  const response = await BuildsDAL.sendBuild(commitData);
  res.send(response);
});

app.post('/api/builds/:commitHash/logs', async (req, res) => {
  // ..................найти id сборки по хэшу......................
  const buildId = req.params.commitHash;
  const response = await BuildsDAL.getBuildLogs(buildId);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
