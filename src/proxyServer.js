const httpProxy = require('http-proxy');

module.exports = function proxyServer(config) {
    const apiProxy = httpProxy.createProxyServer({
        target: config.server.target,
        secure: !config.server.ignoreSSL,
        changeOrigin: config.server.changeOrigin,
    });

    apiProxy.on('proxyReq', function(proxyReq, req) {
        if(req.body) {
            proxyReq.write(req.body.toString());
        }
    });
    return apiProxy;
};
