const fs = require('fs');

const mockExists = (mockData) => {
    return fs.existsSync(mockData.filePath);
};

module.exports = function validateCache() {
    return function middleware(req, res, next) {
        req.mock.mockExists = mockExists(req.mock);
        next();
    };
};

// module.exports.queryToString = queryToString;
