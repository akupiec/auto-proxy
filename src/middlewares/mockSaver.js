const fs = require('fs');
const path = require('path');
const utils = require('./utils');

function mkdirSync(filePath) {
    const dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        return;
    }
    mkdirSync(dirName);
    fs.mkdirSync(dirName);
}

module.exports = function () {
    return function middleware(req, res, next) {
        if(req.mock.mockExists) {
            next();
            return;
        }
        res.bodyStream.on('finish', () => {
            mkdirSync(req.mock.filePath);
            const buffer = utils.encodeBuffer(res, res.bodyStream.body);
            fs.writeFileSync(req.mock.filePath + utils.getExtension(res), buffer);
        });
        next();
    };
};