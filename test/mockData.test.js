/* eslint-env jest */
const mockData = require('../src/middlewares/mockData');
const utils = require('../src/middlewares/utils/utils');


jest.mock('../src/middlewares/utils/utils', () => ({
    cachedEvilFile: jest.fn(),
    cacheNormalFile: jest.fn(),
    cacheDefaultFile: jest.fn(),
}));

describe('mockData', function () {
    let req, res, next;
    beforeEach(function () {
        res = {};
        next = jest.fn();
        req = {
            httpVersion: '1.1',
            complete: false,
            headers: {
                host: '127.0.0.1:9999',
                'accept-encoding': 'gzip, deflate',
                'user-agent': 'node-superagent/3.8.3',
            },
            url: '/abb-cc',
            method: 'GET',
            baseUrl: '/api',
            originalUrl: '/api/abb-cc',
            params: {},
            query: {},
            body: {},
        };
    });

    afterEach(function() {
        utils.cachedEvilFile.mockReset();
        utils.cacheNormalFile.mockReset();
        utils.cacheDefaultFile.mockReset();
    });

    it('create mock obj', function () {
        mockData()(req, res, next);
        expect(req.mock).toBeDefined();
        expect(req.mock._hash).toBe('#824ac3d0');
    });

    it('create fileName', function () {
        mockData()(req, res, next);
        expect(req.mock._fileName).toBe('abb-cc');
    });

    it('create filePath', function() {
        mockData()(req, res, next);
        let filePath = req.mock.filePath;
        filePath = filePath.replace(/\\/g, '/');
        expect(filePath).toContain('/mockDir/api/GET/abb-cc#824ac3d0');
    });

    describe('should have mockExists & filePath', function() {
        it('when evilFile exists', function() {
            utils.cachedEvilFile.mockReturnValue('evilPath');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
            expect(req.mock.filePath).toBe('evilPath');
            expect(utils.cachedEvilFile.mock.calls.length).toBe(1);
            expect(utils.cacheNormalFile.mock.calls.length).toBe(0);
            expect(utils.cacheDefaultFile.mock.calls.length).toBe(0);
        });

        it('when normalFile exists', function() {
            utils.cacheNormalFile.mockReturnValue('normalFile');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
            expect(req.mock.filePath).toBe('normalFile');
            expect(utils.cachedEvilFile.mock.calls.length).toBe(1);
            expect(utils.cacheNormalFile.mock.calls.length).toBe(1);
            expect(utils.cacheDefaultFile.mock.calls.length).toBe(0);
        });

        it('when defaultFile exists', function() {
            utils.cacheDefaultFile.mockReturnValue('defaultPath');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
            expect(req.mock.filePath).toBe('defaultPath');
            expect(utils.cachedEvilFile.mock.calls.length).toBe(1);
            expect(utils.cacheNormalFile.mock.calls.length).toBe(1);
            expect(utils.cacheDefaultFile.mock.calls.length).toBe(1);
        });

        it('when normalFile & defaultFile exists', function() {
            utils.cacheDefaultFile.mockReturnValue('defaultPath');
            utils.cacheNormalFile.mockReturnValue('normalFile');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
            expect(req.mock.filePath).toBe('normalFile');
        });

        it('when all exists', function() {
            utils.cachedEvilFile.mockReturnValue('evilPath');
            utils.cacheDefaultFile.mockReturnValue('defaultPath');
            utils.cacheNormalFile.mockReturnValue('normalFile');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
            expect(req.mock.filePath).toBe('evilPath');
        });

        it('when non exists', function() {
            utils.cachedEvilFile.mockReturnValue(undefined);
            utils.cacheDefaultFile.mockReturnValue(undefined);
            utils.cacheNormalFile.mockReturnValue(undefined);
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(false);
            expect(req.mock.filePath).toBeDefined();
        });
    });
});
