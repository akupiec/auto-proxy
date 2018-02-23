const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const LOGGER = require('../logger')(config);


function mkdirSync(filePath) {
    const dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        return;
    }
    mkdirSync(dirName);
    fs.mkdirSync(dirName);
}

let bodySaver = (req, res) => {
    const buffer = utils.encodeBuffer(res, res.bodyStream.body);
    let fileName = req.mock.filePath + utils.getExtension(res);
    fs.writeFile(fileName, buffer, (e) => {
        if (e) LOGGER.fatal(e);
        LOGGER.debug(`Saved  : ${fileName}      | Bytes: ${buffer.length}`);
    });
};

let metaSaver = (req, res) => {
    // const buffer = utils.encodeBuffer(res, res.bodyStream.body);
    let fileName = req.mock.filePath + utils.getExtension(res) + '.meta';
    fs.writeFile(fileName, buffer, (e) => {
        if (e) LOGGER.fatal(e);
        LOGGER.debug(`Saved  : ${fileName}      | Bytes: ${buffer.length}`);
    });
};

module.exports = function (proxyConfig) {
    return function middleware(req, res, next) {
        if(req.mock.mockExists || !proxyConfig.cache.enabled) {
            next();
            return;
        }

        res.bodyStream.on('finish', () => {
            mkdirSync(req.mock.filePath);
            bodySaver(req, res);
            metaSaver(req, res);
        });
        next();
    };
};