const httpProxy = require('http-proxy');

module.exports = function proxyServer(config) {
    return httpProxy.createProxyServer({
        target: config.server.target,
        secure: !config.server.ignoreSSL,
        changeOrigin: config.server.changeOrigin,
    });
};