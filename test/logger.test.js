const logger1 = require('../src/logger');
const logger2 = require('../Src/Logger');
const logger3 = require('../Src/LOGGER');

describe('logger', function () {
    let logLvl;
    beforeEach(() => {
        logLvl = logger1.logLvl;
    });
    afterEach(() => {
        logger1.logLvl = logLvl;
    });

    it('should be singleton', function () {
        logger1.logLvl = 'AAA';
        expect(logger1.logLvl).toBe(logger2.logLvl);
        expect(logger1.logLvl).toBe(logger3.logLvl);
    });
});

