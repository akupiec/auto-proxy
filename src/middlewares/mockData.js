const crc = require('crc');
const path = require('path');

function queryToString(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

function parseDirName(config, contextPath, method) {
    return path.join(config.mock, contextPath.replace(/^\//g, '').replace(/\//g, '_'), method.toUpperCase());
}

let parseFileName = function (contextPath, url, hash) {
    return url.replace(contextPath, '').replace(/\?.*/, '').replace(/^\//g, '').replace(/\//g, '_') + hash + '.json';
};

module.exports = function (config) {
    return function middleware(req, res, next) {
        const reqBody = req.body ? req.body.toString() : '' ;
        const strQuery = queryToString(req.query);
        const hash = '#' + crc.crc32(strQuery + reqBody).toString(16);
        const dirName = parseDirName(config, req.baseUrl, req.method);
        const fileName = parseFileName(req.baseUrl, req.originalUrl, hash);
        req.mock = {
            hash: hash,
            query: strQuery,
            body: reqBody,
            fileName: fileName,
            filePath: path.join(process.cwd(), dirName, fileName),
        };
        next();
    };
};

module.exports.queryToString = queryToString;
