const httpProxy = require('http-proxy');

module.exports = httpProxy.createProxyServer({
    target: 'http://google.pl',
    // secure: !argv.server.ignoreSSL,
    // changeOrigin: argv.server.changeOrigin,
});