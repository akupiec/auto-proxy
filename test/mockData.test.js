/* eslint-env jest */
const mockData = require('../src/middlewares/mockData');
const utils = require('../src/middlewares/utils/utils');


jest.mock('../src/middlewares/utils/utils');

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

    describe('should mockExists', function() {
        it('be true when local file exists', function() {
            utils.cacheFileResolve.mockReturnValue('someFilePath');
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(true);
        });
        it('be false when file not exists', function() {
            utils.cacheFileResolve.mockReturnValue(undefined);
            mockData()(req, res, next);
            expect(req.mock.mockExists).toBe(false);
        });
    });
});
