const logger = require('../logger');

module.exports = function (config, proxy) {
    const LOGGER = logger(config);

    return function middleware(req, res) {
        if(!req.mock.mockExists) {
            LOGGER.debug(`Sending: ${req.method} ${req.url} ${req.mock.hash}`);
            proxy.web(req, res);
        }
    };
};