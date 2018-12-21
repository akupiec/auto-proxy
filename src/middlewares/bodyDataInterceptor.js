const StreamWriter = require('./utils/StreamWriter');

module.exports = function validateCache() {
    return function bodyDataInterceptor(req, res, next) {
        if (req.mock.mockExists) {
            next();
            return;
        }
        const oldWrite = res.write;
        const oldEnd = res.end;

        const ws = new StreamWriter();
        res.bodyStream = ws;

        res.write = function (chunk) {
            ws.write(chunk);
            oldWrite.apply(res, arguments);
        };
        res.end = function (chunk) {
            ws.end(chunk);
            oldEnd.apply(res, arguments);
        };

        next();
    };
};
