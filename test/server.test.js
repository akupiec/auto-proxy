/* eslint-env jest */

const express = require('express');
const config = require('../src/config/config');
const server = require('../src/server');
const reverseProxy = require('../src/middlewares/reverseProxy');

jest.mock('../src/config/config', () => require('./testingConfig'));
jest.mock('fs');
jest.mock('../src/config/logger');
jest.mock('../src/middlewares/reverseProxy');
jest.mock('express', () => jest.fn());

describe('server proxy as URL', () => {
    let listen, use, all;
    beforeEach(function () {
        listen = jest.fn();
        use = jest.fn();
        all = jest.fn();
        reverseProxy.mockImplementation();
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
    });
    afterEach(function () {
        listen.mockReset();
        use.mockReset();
        all.mockReset();
        express.mockReset();
        reverseProxy.mockReset();
    });

    describe('using middleware', function () {
        let middlewares;
        beforeEach(function () {
            server();
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

        it('bodyDataInterceptor', function () {
            expect(middlewares).toContain('bodyDataInterceptor');
        });

        it('mockData', function () {
            expect(middlewares).toContain('mockData');
        });

        it('mockGeter', function () {
            expect(middlewares).toContain('mockGeter');
        });

        it('mockSaver', function () {
            expect(middlewares).toContain('mockSaver');
        });

        it('validateCache', function () {
            expect(middlewares).toContain('validateCache');
        });

        it('mockSaver', function () {
            expect(middlewares).toContain('mockSaver');
        });
    });

    describe('delegating all', function () {
        it('reverseProxy', function () {
            server();
            expect(all.mock.calls.length).toBe(1);
            expect(reverseProxy.mock.calls.length).toBe(1);
        });
    });
});
