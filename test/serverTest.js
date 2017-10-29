/* eslint-env mocha */

const assert = require('assert');
const request = require('supertest');

const config = require('../src/config');
const fakeConfig = {
    mock: './FAKE_MOCK_DIR/',
    server: {
        port: 9999,
    },
    proxies: [{
        contextPath: '/api',
    }],
    log: 'ALL',
};
Object.assign(config, fakeConfig);

describe('loading express', function () {
    let server, proxy;
    beforeEach(function () {
        proxy = {
            web: function (req, res) {
                res.send(200, 'REVERSE RESPONSE SUCCESS');
            },
        };
        server = require('../src/server')(proxy);
    });
    afterEach(function () {
        server.close();
        proxy = null;
    });

    it('responds to reverse proxy', function testSlash() {
        return request(server)
            .get('/api/abb-cc')
            .send('aaa')
            .expect(200)
            .then(response => {
                assert.equal(response.text, 'REVERSE RESPONSE SUCCESS');
            });
    });
});