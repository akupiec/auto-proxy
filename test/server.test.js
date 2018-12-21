/* eslint-env jest */

const express = require('express');
const config = require('../src/config');
const server = require('../src/server');

jest.mock('../src/config', () => require('./testingConfig'));
jest.mock('fs');
jest.mock('../src/logger', () => () => ({
    info: jest.fn(),
}));
jest.mock('express', () => jest.fn());

describe('server proxy as URL', () => {
    let listen, use, proxyServer, all;
    beforeEach(function () {
        listen = jest.fn();
        use = jest.fn();
        all = jest.fn();
        express.mockImplementation(() => ({ use, listen, all }));
        Object.assign(config, {
            server: {
                port: 333,
            },
            proxies: [{
                path: '/api222',
                target: 'http://google.com',
                cache: { enabled: true },
            }],
        });
        proxyServer = jest.fn();
    });
    afterEach(function () {
        proxyServer.mockReset();
        listen.mockReset();
        use.mockReset();
        all.mockReset();
        express.mockReset();
    });

    describe('using middleware', function () {
        let middlewares;
        beforeEach(function () {
            server(proxyServer);
            middlewares = use.mock.calls.map((params) => {
                if (typeof params[0] === 'function') {
                    return params[0].name;
                } else if (typeof params[1] === 'function') {
                    return params[1].name;
                }
                return '';
            });
        });
        afterEach(function () {
            middlewares = null;
        });

        it('bodyDataInterceptor', function testSlash() {
            expect(middlewares).toContain('bodyDataInterceptor');
        });

        it('mockData', function testSlash() {
            expect(middlewares).toContain('mockData');
        });

        it('mockGeter', function testSlash() {
            expect(middlewares).toContain('mockGeter');
        });

        it('mockSaver', function testSlash() {
            expect(middlewares).toContain('mockSaver');
        });

        it('validateCache', function testSlash() {
            expect(middlewares).toContain('validateCache');
        });

        it('mockSaver', function testSlash() {
            expect(middlewares).toContain('mockSaver');
        });
    });

    describe('delegating all', function () {
        it('reverseProxy', function testSlash() {
            server(proxyServer);
            const foo = all.mock.calls.map((params) => {
                if (typeof params[0] === 'function') {
                    return params[0].name;
                } else if (typeof params[1] === 'function') {
                    return params[1].name;
                }
                return '';
            });
            expect(foo).toContain('reverseProxy');
        });
    });
});
