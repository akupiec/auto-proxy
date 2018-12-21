const defaultConfig = require('../bin/mad-proxy.config');
defaultConfig.proxies = [];
const fakeConfig = {
    mock: './FAKE_MOCK_DIR/',
    server: {
        port: 9999,
    },
    log: 'ALL',
};

module.exports = Object.assign({}, defaultConfig, fakeConfig);
