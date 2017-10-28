const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const logger = require('../logger');


function mkdirSync(filePath) {
    const dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        return;
    }
    mkdirSync(dirName);
    fs.mkdirSync(dirName);
}

module.exports = function (config) {
    const LOGGER = logger(config);

    return function middleware(req, res, next) {
        if(req.mock.mockExists) {
            next();
            return;
        }
        res.bodyStream.on('finish', () => {
            mkdirSync(req.mock.filePath);
            const buffer = utils.encodeBuffer(res, res.bodyStream.body);
            let fileName = req.mock.filePath + utils.getExtension(res);
            fs.writeFileSync(fileName, buffer);
            LOGGER.debug(`Saved  : ${fileName}      | Bytes: ${buffer.length}`);
        });
        next();
    };
};