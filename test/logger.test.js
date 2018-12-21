const logger1 = require('../src/config/logger.js');
const logger2 = require('../Src/Config/logger.js');
const logger3 = require('../Src/CONFIG/LOGGER.js');

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
