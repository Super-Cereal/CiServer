"use strict";
/* eslint-disable max-len */
var mcache = require('memory-cache');
var cacheBuildLogs = function (duration) { return function (req, res, next) {
    // const buildStatus = await BuildDAL.(req.params.buildId).data?.status?.toLowerCase();
    // if (buildStatus !== 'fail' && buildStatus !== 'success') next();
    // duration - сколько кэш проживет в часах
    var key = "__express__" + req.params.buildId;
    var cachedBody = mcache.get(key);
    if (cachedBody) {
        console.log('cachedBody');
        res.send(cachedBody);
        return;
    }
    res.sendResponse = res.send;
    res.send = function (body) {
        console.log('caching body !!');
        mcache.put(key, body, duration * 1000 * 3600);
        res.sendResponse(body);
    };
    next();
}; };
module.exports = cacheBuildLogs;
//# sourceMappingURL=cacheBuildLogs.js.map