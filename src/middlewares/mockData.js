const crc = require('crc');
const path = require('path');
const config = require('../config/config');
const utils = require('./utils/utils');

function queryToString(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

function parseDirName(config, contextPath, method) {
    return path.join(config.mock, contextPath.replace(/^\//g, '').replace(/\//g, '_'), method.toUpperCase());
}

let parseFileName = function (contextPath, url) {
    return url.replace(contextPath, '').replace(/\?.*/, '').replace(/^\//g, '').replace(/\//g, '_');
};

module.exports = function () {
    return function mockData(req, res, next) {
        const reqBody = req.body ? req.body.toString() : '' ;
        const strQuery = queryToString(req.query);
        const hash = '#' + crc.crc32(strQuery + reqBody).toString(16);
        const dirName = parseDirName(config, req.baseUrl, req.method);
        const fileName = parseFileName(req.baseUrl, req.originalUrl);

        const normalFilePath = path.join(process.cwd(), dirName, fileName) + hash;
        const savedFile = utils.cachedEvilFile(normalFilePath) || utils.cacheNormalFile(normalFilePath) || utils.cacheDefaultFile(normalFilePath);
        req.mock = {
            _hash: hash,
            _fileName: fileName,
            filePath: savedFile || normalFilePath,
            mockExists: !!savedFile,
        };

        next();
    };
};

module.exports.queryToString = queryToString;
