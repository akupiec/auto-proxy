const config = require('../config');
const LOGGER = require('../logger')(config);

module.exports = function (confProxy, proxyServer) {
    return function middleware(req, res) {
        if(!req.mock.mockExists) {
            LOGGER.debug(`Sending: ${req.method} ${req.url} ${req.mock.hash}`);
            proxyServer.web(req, res);
        }
    };
};