const fs = require('fs');
const LOGGER = require('../config/logger');

module.exports = function (proxyConfig) {
    return function mockGeter(req, res, next) {
        if(req.mock.mockExists && proxyConfig.cache.enabled) {
            LOGGER.debug('Sending from mock', req.mock.filePath);
            let readStream = fs.createReadStream(req.mock.filePath);
            res.status(200);
            readStream.pipe(res);
            return;
        }
        next();
    };
};
