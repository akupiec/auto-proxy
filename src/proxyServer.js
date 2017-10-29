const httpProxy = require('http-proxy');

module.exports = function proxyServer(config) {
    const apiProxy = httpProxy.createProxyServer({
        target: config.proxy.target,
        secure: config.proxy.secure,
        changeOrigin: config.proxy.changeOrigin,
    });

    apiProxy.on('proxyReq', function(proxyReq, req) {
        if(req.body) {
            proxyReq.write(req.body.toString());
        }
    });
    return apiProxy;
};
