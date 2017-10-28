/* eslint-disable no-console */
const chalk = require('chalk');
const argv = require('./argv');

//ALL < DEBUG < INFO < WARN < ERROR < FATAL < OFF
const LOG_PRIORYTY = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF'];
module.exports = class Logger {
    constructor(lvl, ...args) {
        let logCode = lvl;
        const argLogIdx = LOG_PRIORYTY.indexOf(argv.log);
        const lvlIdx = LOG_PRIORYTY.indexOf(lvl);
        if(argLogIdx > lvlIdx) {
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
    }

    static fatal(...args) {
        return new Logger('FATAL', ...args);
    }

    static error(...args) {
        return new Logger('ERROR', ...args);
    }

    static warn(...args) {
        return new Logger('WARN', ...args);
    }

    static info(...args) {
        return new Logger('INFO', ...args);
    }

    static debug(...args) {
        return new Logger('DEBUG', ...args);
    }

    static trace(...args) {
        return new Logger('TRACE', ...args);
    }
};
