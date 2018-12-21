const httpProxy = require('http-proxy');
const config = require('../../config/config');

const apiProxy = httpProxy.createProxyServer({
    secure: config.proxy.secure,
    changeOrigin: config.proxy.changeOrigin,
});

apiProxy.on('proxyReq', function (proxyReq, req) {
    if (req.body && req.body instanceof Buffer) {
        proxyReq.write(req.body.toString());
    }
});

module.exports = apiProxy;
