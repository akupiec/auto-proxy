/* eslint-env mocha */

const assert = require('assert');
const request = require('supertest');
const mockFs = require('mock-fs');
const fakeConfig = require('./testingConfig');

describe('loading express', function () {
    let server, proxyServer;
    beforeEach(function () {
        fakeConfig({
            proxies: [{
                path: '/api',
                target: 'http://google.com',
                cache: {},
            }],
        });
        proxyServer = {
            web: function (req, res) {
                res.send(200, 'REVERSE RESPONSE SUCCESS');
            },
        };
        server = require('../src/server')(proxyServer);
        mockFs();
    });
    afterEach(function () {
        server.close();
        proxyServer = null;
        mockFs.restore();
    });

    it('responds to reverse proxyServer', function testSlash() {
        return request(server)
            .get('/api/abb-cc')
            .send('aaa')
            .expect(200)
            .then(response => {
                assert.equal(response.text, 'REVERSE RESPONSE SUCCESS');
            });
    });

    it('should write file', function testSlash() {

    });
});