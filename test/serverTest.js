/* eslint-env mocha */

const assert = require('assert');
const request = require('supertest');

describe('loading express', function () {
    let server, proxy;
    beforeEach(function () {
        proxy = {
            web: function (req, res) {
                res.send(200, 'REVERSE RESPONSE SUCCESS');
            },
        };
        server = require('../src/server')(proxy);
    });
    afterEach(function () {
        server.close();
        proxy = null;
    });

    it('responds to reverse proxy', function testSlash() {
        return request(server)
            .get('/api/a')
            .send('aaa')
            .expect(200)
            .then(response => {
                assert.equal(response.text, 'REVERSE RESPONSE SUCCESS');
            });
    });
    it('response fallback', function () {
        return request(server)
            .get('/api/a')
            .expect(200)
            .then(response => {
                assert.equal(response.text, 'bbbb');
            });
    });
});