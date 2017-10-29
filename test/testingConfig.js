const config = require('../src/config');
const fakeConfig = {
    mock: './FAKE_MOCK_DIR/',
    server: {
        port: 9999,
    },
    log: 'ALL',
};
Object.assign(config, fakeConfig);

module.exports = function (newConfig) {
    Object.assign(config, newConfig);
};