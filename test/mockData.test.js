/* eslint-env jest */
const mockData = require('../src/middlewares/mockData');


describe('mockData', function () {
    let req;
    beforeEach(function () {
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
        // const mock = {
        //     hash: '#824ac3d0',
        //     query: '',
        //     fileName: 'abb-cc#824ac3d0',
        //     filePath: 'C:\\Projects\\mad-proxy\\FAKE_MOCK_DIR\\api\\GET\\abb-cc#824ac3d0',
        // };
    });

    it('create mock obj', function () {
        const res = {};
        const next = jest.fn();
        mockData()(req, res, next);
        expect(req.mock).toBeDefined();
        expect(req.mock.hash).toBe('#824ac3d0');
    });

    it('create fileExt', function() {
        
    });
    it('create fileName', function () {
        
    });
    it('create filePaths', function () {

    });
    it('crate filePath', function() {

    });
});
