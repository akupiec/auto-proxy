const cacheFileResolve = require('./utils').cacheFileResolve;

module.exports = function () {
    return function validateCache(req, res, next) {
        let filePath = cacheFileResolve(req.mock.filePath);
        if(filePath) {
            req.mock.mockExists = true;
            req.mock.filePath = filePath;
        }
        next();
    };
};