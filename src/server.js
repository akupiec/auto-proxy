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
const fs = require('fs');
const LOGGER = require('./logger');


function isUrl(target = '') {
    return target.match(/https?:\/\/.*/i);
}
function isDirectory(target = '') {
    return fs.lstatSync(path.normalize(target)).isDirectory();
}

function isFile(target = '') {
    return fs.lstatSync(path.normalize(target)).isFile();
}

module.exports = function () {
    const app = express();
    // app.use(cookieParser());
    app.use(bodyParser.raw({type: '*/*'}));

    config.proxies.map(confProxy => {
        if(isUrl(confProxy.target)) {
            LOGGER.info(`Binding reverse proxy on: ${confProxy.path} to ${confProxy.target}${confProxy.path}`);
            app.use(confProxy.path, mockData(confProxy));
            app.use(confProxy.path, validateCache(confProxy));
            app.use(confProxy.path, bodyDataInterceptor(confProxy));
            app.use(confProxy.path, mockSaver(confProxy));
            app.use(confProxy.path, mockGetter(confProxy));
            app.all(confProxy.path + '(/*)?', reverseProxy(confProxy));

        } else if (isDirectory(confProxy.target)) {
            const target = path.join(process.cwd(), confProxy.path, confProxy.target);
            LOGGER.info(`Binding static hosting on: ${confProxy.path} to ${target}`);
            app.use(confProxy.path, express.static(confProxy.target));
        } else if (isFile(confProxy.target)) {
            const target = path.join(process.cwd(), confProxy.path, confProxy.target);
            LOGGER.info(`Binding static hosting on: ${confProxy.path} to ${target}`);
            app.use(confProxy.path, function(req, res) {
                res.sendFile(target);
            });
        } else {
            LOGGER.error(`Can not bind host on: ${confProxy.path} to ${confProxy.target}, target should be: url, local directory or local file`);
        }
    });

    // app.use(function (err, req, res, next) {
    //     console.error(err.stack);
    //     res.status(500).send('Something broke!');
    // });

    return app.listen(config.server.port, function () {
        LOGGER.info(`LOCAL PROXY SERVER: listening on http://localhost:${config.server.port}\n\n`);
    });
};
