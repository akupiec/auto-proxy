module.exports = function (confing, proxy) {
    return function middleware(req, res, next) {
        if(!req.mock.mockExists) {
            console.log(`Sending: ${req.method} ${req.url} ${req.mock.hash}`);
            proxy.web(req, res);
        }
    };
};