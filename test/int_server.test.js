/* eslint-env jest */

const request = require('supertest');
const config = require('../src/config/config');
const fs = require('fs');

jest.mock('../src/config/config', () => require('./testingConfig'));
jest.mock('fs', () => ({
    readdirSync: jest.fn(),
    existsSync: jest.fn(),
    writeFileSync: jest.fn(),
}));
jest.mock('../src/config/logger');

jest.mock('../src/middlewares/utils/proxyServer', () => {
    return {
        web: (req, res) => {
            res.status(200).send('OK');
        },
    };
});

describe('integration express', function () {
    let server;
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
        server = require('../src/server')();
    });
    afterEach(function () {
        server.close();
        fs.writeFileSync.mockReset();
    });

    it('responds to reverse proxyServer', function () {
        return request(server)
            .get('/api/test')
            .expect(200)
            .then(response => {
                expect(response.text).toEqual('OK');
            });
    });

    it('should create cached file at get', function () {
        return request(server)
            .get('/api/abb-cc?par1=aaa&par2=bbb')
            .expect(200)
            .then(() => {
                const calls = fs.writeFileSync.mock.calls;
                expect(calls.length).toEqual(1);
                let path = calls[0][0];
                expect(path).toBeDefined();
                path = path.replace(/\\/g, '/');
                expect(path).toContain('/FAKE_MOCK_DIR/api/GET/abb-cc#977c21ac.html');
                expect(calls[0][1].toString()).toBe('OK');
            });
    });

    it('should create cached file at post', function () {
        return request(server)
            .post('/api/abb-dd', {a: '12', b: 'aaaa'})
            .expect(200)
            .then(() => {
                const calls = fs.writeFileSync.mock.calls;
                expect(calls.length).toEqual(1);
                let path = calls[0][0];
                expect(path).toBeDefined();
                path = path.replace(/\\/g, '/');
                expect(path).toContain('/FAKE_MOCK_DIR/api/POST/abb-dd#824ac3d0.html');
                expect(calls[0][1].toString()).toBe('OK');
            });
    });
});
