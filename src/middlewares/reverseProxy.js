const config = require('../config');
const LOGGER = require('../logger');
const proxyServer = require('./proxyServer');

module.exports = function (confProxy) {
    return function reverseProxy(req, res) {
        if(config.proxy.disabled) {
            res.sendStatus(404);
            return;
        }
        if(!req.mock.mockExists) {
            LOGGER.debug(`Sending: ${req.method} ${req.url} ${req.mock.hash}`);
            proxyServer.web(req, res, {target: confProxy.target}, function (e) {
                LOGGER.fatal('Error occurred: Propably destination server is unavailable:\n', confProxy.target, req.originalUrl);
                LOGGER.error(e);
            });
        }
    };
};
