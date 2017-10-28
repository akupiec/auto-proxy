const fs = require('fs');
const logger = require('../logger');

module.exports = function (config) {
    const LOGGER = logger(config);

    return function middleware(req, res, next) {
        if(req.mock.mockExists) {
            LOGGER.debug('Sending from mock', req.mock.filePath);
            let readStream = fs.createReadStream(req.mock.filePath);
            res.status(200);
            readStream.pipe(res);
            return;
        }
        next();
    };
};