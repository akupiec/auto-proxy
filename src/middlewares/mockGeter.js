const fs = require('fs');

module.exports = function () {
    return function middleware(req, res, next) {
        if(req.mock.mockExists) {
            console.log('Sending from mock', req.mock.filePath);
            let readStream = fs.createReadStream(req.mock.filePath);
            res.status(200);
            readStream.pipe(res);
            return;
        }
        next();
    };
};