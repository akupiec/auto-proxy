const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const mockData = require('./middlewares/mockData');
const validateCache = require('./middlewares/validateCache');
const bodyDataInterceptor = require('./middlewares/bodyDataInterceptor');
const reverseProxy = require('./middlewares/reverseProxy');
const mockGetter = require('./middlewares/mockGeter');
const mockSaver = require('./middlewares/mockSaver');
const config = require('./config');
const path = require('path');
const LOGGER = require('./logger')(config);

module.exports = function (proxyServer) {
    const app = express();
    // app.use(cookieParser());
    app.use(bodyParser.raw({type: '*/*'}));

    if (config.server.staticSource) {
        LOGGER.info(`Binding static content on: ${config.server.staticSource}`);
        app.use(config.server.staticSource, express.static(config.server.staticPath));
    }

    config.proxies.map(confProxy => {
        LOGGER.info(`Binding proxy on: ${confProxy.contextPath}`);
        confProxy.cache = confProxy.cache || {};

        app.use(confProxy.contextPath, mockData(confProxy));
        app.use(confProxy.contextPath, validateCache(confProxy));
        app.use(confProxy.contextPath, bodyDataInterceptor(confProxy));
        app.use(confProxy.contextPath, mockSaver(confProxy));
        app.use(confProxy.contextPath, mockGetter(confProxy));
        app.all(confProxy.contextPath + '(/*)?', reverseProxy(confProxy, proxyServer));
    });

    if (config.server.fallback) {
        LOGGER.info(`Binding fallback: ${path.resolve(config.server.fallback)}`);
        app.all('/*', function (req, res) {
            res.sendFile(path.resolve(config.server.fallback));
        });
    }

    return app.listen(config.server.port, function () {
        LOGGER.info(`LOCAL PROXY SERVER: listening on http://localhost:${config.server.port} and proxing: ${config.proxy.target} \n\n`);
    });
};
