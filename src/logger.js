/* eslint-disable no-console */
const chalk = require('chalk');

//ALL < DEBUG < INFO < WARN < ERROR < FATAL < OFF
const LOG_PRIORYTY = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF'];
module.exports = function (config) {
    const log = (lvl, ...args) => {
        let logCode = lvl;
        const argLogIdx = LOG_PRIORYTY.indexOf(config.log);
        const lvlIdx = LOG_PRIORYTY.indexOf(lvl);
        if (argLogIdx > lvlIdx) {
            logCode = 'NO_LOG';
        }
        switch (logCode) {
            case 'DEBUG': {
                console.log(chalk.cyan(`[${lvl}]`), ...args);
                break;
            }
            case 'INFO': {
                console.log(chalk.green(`[${lvl}]`), ...args);
                break;
            }
            case 'WARN': {
                console.log(chalk.yellow(`[${lvl}] ${args[0]}`), ...args.slice(1));
                break;
            }
            case 'ERROR': {
                console.log(chalk.red(`[${lvl}] ${args[0]}`), ...args.slice(1));
                break;
            }
            case 'FATAL': {
                console.log(chalk.red('-------'));
                console.log(chalk.red.bold.underline(`[${lvl}] ${args[0]}`), ...args.slice(1));
                console.log(chalk.red('-------'));
                break;
            }
            case 'TRACE': {
                console.log(...args);
                break;
            }
            default:
            // console.log('WRONG LOG LEVEL! CHECK CODE!', lvl, ...args);
        }
    };

    const fatal = (...args) => {
        return log('FATAL', ...args);
    };

    const error = (...args) => {
        return log('ERROR', ...args);
    };

    const warn = (...args) => {
        return log('WARN', ...args);
    };

    const info = (...args) => {
        return log('INFO', ...args);
    };

    const debug = (...args) => {
        return log('DEBUG', ...args);
    };

    const trace = (...args) => {
        return log('TRACE', ...args);
    };

    return {
        log, debug, error, fatal, info, trace, warn,
    };
};