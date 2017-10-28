const cacheFileResolve = require('./utils').cacheFileResolve;

module.exports = function validateCache() {
    return function middleware(req, res, next) {
        let filePath = cacheFileResolve(req.mock.filePath);
        if(filePath) {
            req.mock.mockExists = true;
            req.mock.filePath = filePath;
        }
        next();
    };
};