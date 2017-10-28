/* global __dirname process*/

const express = require('express');
// const zlib = require('zlib');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


module.exports = function (apiProxy) {
    const app = express();
    app.use(cookieParser());
    app.use(bodyParser.raw({type: '*/*'}));

// app.use(argv.server.source, express.static(argv.server.path));

    app.all('/api/**', function (req, res) {
        const s = req.body.toString();
        console.log(`Request: ${req.method} ${req.url}`, s);
        if (s === 'aaa') {
            apiProxy.web(req, res);
        } else {
            res.send(200, 'bbbb');
        }
    });

    return app.listen(8080, function () {
        console.log('LOCAL PROXY SERVER: listening on http://localhost:8080');
    });
};
