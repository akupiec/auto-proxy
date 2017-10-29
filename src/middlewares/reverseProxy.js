const config = require('../config');
const LOGGER = require('../logger')(config);

module.exports = function (confProxy, proxyServer) {
    return function middleware(req, res) {
        if(config.proxy.disabled) {
            res.sendStatus(404);
            return;
        }
        if(!req.mock.mockExists) {
            LOGGER.debug(`Sending: ${req.method} ${req.url} ${req.mock.hash}`);
            proxyServer.web(req, res);
        }
    };
};