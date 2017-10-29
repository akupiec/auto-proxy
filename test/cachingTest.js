/* eslint-env mocha */

const assert = require('assert');
const request = require('supertest');
const mockFs = require('mock-fs');
const fakeConfig = require('./testingConfig');
const fs = require('fs');

describe('caching', function () {
    let server, proxyServer;
    const fsSystem = {};
    beforeEach(function () {
        fakeConfig({
            proxies: [{
                contextPath: '/api',
                cache: {
                    enabled: true,
                },
            }],
        });

        // server ? undefined : server.close();
        proxyServer = {
            web: function (req, res) {
                res.send(200, 'REVERSE RESPONSE SUCCESS');
            },
        };
        server = require('../src/server')(proxyServer);
        mockFs(fsSystem);
    });
    afterEach(function () {
        server.close();
        proxyServer = null;
        mockFs.restore();
    });

    it('should create cached file', function testSlash() {
        return request(server)
            .get('/api/abb-cc')
            .send('aaa')
            .expect(200)
            .then(response => {
                const a = fs.readFileSync('./FAKE_MOCK_DIR/api/GET/abb-cc#f007732d.html').toString();
                assert.equal(response.text, 'REVERSE RESPONSE SUCCESS');
                assert.equal(a, response.text);
            });

    });
});