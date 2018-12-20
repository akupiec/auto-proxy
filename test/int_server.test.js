/* eslint-env jest */

const request = require('supertest');
const config = require('../src/config');
const fs = require('fs');

jest.mock('../src/config', () => require('./testingConfig'));
jest.mock('fs');

describe('integration express', function () {
    let server, proxyServer;
    beforeEach(function () {
        fs.readdirSync.mockReturnValue([]);
        fs.existsSync.mockReturnValue(true);
        Object.assign(config, {
            proxies: [{
                path: '/api',
                target: 'http://google.com',
                cache: {enabled: true},
            }],
        });

        proxyServer = {
            web: (req, res) => {
                res.send(200, 'OK');
            },
        };
        server = require('../src/server')(proxyServer);
    });
    afterEach(function () {
        server.close();
        fs.writeFileSync.mockReset();
    });

    it('responds to reverse proxyServer', function testSlash() {
        return request(server)
            .get('/api/test')
            .expect(200)
            .then(response => {
                expect(response.text).toEqual('OK');
            });
    });

    it('should create cached file', function testSlash() {
        return request(server)
            .get('/api/abb-cc')
            .expect(200)
            .then(() => {
                const calls = fs.writeFileSync.mock.calls;
                expect(calls.length).toEqual(1);
                let path = calls[0][0];
                expect(path).toBeDefined();
                path = path.replace(/\\/g, '/');
                expect(path).toContain('/FAKE_MOCK_DIR/api/GET/abb-cc#824ac3d0.html');
                expect(calls[0][1].toString()).toBe('OK');
            });
    });
});