/* eslint-disable no-console */
const chalk = require('chalk');

const GLOB_KEY = Symbol.for('akupiec.mad-proxy.logger');

//ALL < DEBUG < INFO < WARN < ERROR < FATAL < OFF
const LOG_PRIORITY = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF'];
class Logger {
    constructor() {
        this.logLvl = 'ALL';
    }
    _log(lvl, ...args) {
        let logCode = lvl;
        const argLogIdx = LOG_PRIORITY.indexOf(this.logLvl);
        const lvlIdx = LOG_PRIORITY.indexOf(lvl);
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
            case 'NO_LOG': {
                break;
            }
            default:
                console.log(chalk.red(`[FATAL] WRONG LOG LEVEL! CHECK CODE! [${lvl}]`, ...args));
        }
    }

    fatal(...args) {
        return this._log('FATAL', ...args);
    }

    error(...args) {
        return this._log('ERROR', ...args);
    }

    warn(...args) {
        return this._log('WARN', ...args);
    }

    info(...args) {
        return this._log('INFO', ...args);
    }

    debug(...args) {
        return this._log('DEBUG', ...args);
    }

    trace(...args) {
        return this._log('TRACE', ...args);
    }
}

if (!global.hasOwnProperty(GLOB_KEY)) {
    global[GLOB_KEY] = new Logger();
}

module.exports = global[GLOB_KEY];