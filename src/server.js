/* global __dirname process*/

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mockData = require('./middlewares/mockData');
const validateCache = require('./middlewares/validateCache');
const bodyDataInterceptor = require('./middlewares/bodyDataInterceptor');
const reverseProxy = require('./middlewares/reverseProxy');
const mockGetter = require('./middlewares/mockGeter');
const mockSaver = require('./middlewares/mockSaver');

module.exports = function (proxyServer, config, logger) {
    const app = express();
    app.use(cookieParser());
    app.use(bodyParser.raw({type: '*/*'}));

    if(config.server.source) {
        app.use(config.server.source, express.static(config.server.path));
    }

    config.proxies.map(proxy => {
        logger.info(`Binding proxy on: ${proxy.contextPath}`);

        app.use(proxy.contextPath, mockData(config));
        app.use(proxy.contextPath, validateCache(config));
        app.use(proxy.contextPath, bodyDataInterceptor(config));
        app.use(proxy.contextPath, mockSaver(config));
        app.use(proxy.contextPath, mockGetter(config));
        app.use(proxy.contextPath, reverseProxy(config, proxyServer));
    });


    if (config.server.fallback) {
        logger.info(`Binding fallback: ${config.server.path}${config.server.fallback}`);
        app.all('/*', function (req, res, next) {
            res.sendFile(config.server.fallback, {root: config.server.path});
        });
    }
    
    return app.listen(config.server.port, function () {
        logger.info(`LOCAL PROXY SERVER: listening on http://localhost:${config.server.port} and proxing: ${config.server.target} \n\n`);
    });
};
