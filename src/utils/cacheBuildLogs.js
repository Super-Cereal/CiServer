const mcache = require('memory-cache');

const cacheBuildLogs = (duration) => (req, res, next) => {
  // duration - сколько кэш проживет в часах
  const key = `__express__${req.params.buildId}`;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    console.log('cachedBody');
    res.send(cachedBody);
    return;
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    console.log('caching body !!');
    mcache.put(key, body, duration * 1000 * 3600);
    res.sendResponse(body);
  };
  next();
};

module.exports = cacheBuildLogs;
