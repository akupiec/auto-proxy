const fs = require('fs');
const config = require('../config');
const LOGGER = require('../logger')(config);

module.exports = function () {
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