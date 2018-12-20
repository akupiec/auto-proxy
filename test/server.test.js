/* eslint-env jest */

const request = require('supertest');
const fs = require('fs');

jest.mock('../src/config', () => {
    const fakeConfig = require('./testingConfig');
    return Object.assign({}, fakeConfig, {
        proxies: [{
            path: '/api',
            target: 'http://google.com',
            cache: {enabled: true},
        }],
    });
});
jest.mock('fs');

describe('loading express', function () {
    let server, proxyServer;
    beforeEach(function () {
        fs.readdirSync.mockReturnValue([]);
        fs.existsSync.mockReturnValue(true);
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
                expect(calls[0][0]).toContain('\\FAKE_MOCK_DIR\\api\\GET\\abb-cc#824ac3d0.html');
                expect(calls[0][1].toString()).toBe('OK');
            });
    });
});