/* globals process */
const yargs = require('yargs');

const GENERAL_GROUP = 'General:';
const SERVER_GROUP = 'Local Server:';
const argv = yargs.usage('$0 cli usage:')
    .option('config', {
        alias: 'c',
        describe: 'Path to the config file, accepts js|json. All cli options can be override by configuration file.',
        type: 'string',
        group: GENERAL_GROUP,
        default: 'auto-proxy.json',
    })
    .options('mock', {
        alias: 'm',
        describe: 'destination path where mocks will be stored',
        default: 'mocks',
        group: GENERAL_GROUP,
    })
    .options('cacheOnly', {
        describe: 'will block connection to all external servers, only cached mocks will be provided',
        default: false,
        group: GENERAL_GROUP,
    })
    .options('autoMocking', {
        describe: 'All responses will be automatically cached in mock directory',
        default: true,
    })
    .options('server.port', {
        alias: ['port'],
        type: 'number',
        describe: 'local server port',
        group: SERVER_GROUP,
        default: 8088,
    })
    .options('server.target', {
        alias: ['target'],
        type: 'string',
        describe: 'proxy destination serer url',
        group: SERVER_GROUP,
        default: 'https://my_external_server.com:443',
    })
    .options('server.ignoreSSL', {
        alias: ['ignoreSSL'],
        type: 'boolean',
        group: SERVER_GROUP,
        default: false,
    })
    .options('server.path', {
        type: 'string',
        describe: 'Static serving path',
        group: SERVER_GROUP,
        default: '/',
    })
    .options('server.fallback', {
        type: 'string',
        describe: 'file served by default when nothing else fits',
        group: SERVER_GROUP,
    })
    .options('server.changeOrigin', {
        type: 'boolean',
        describe: 'Proxy changes origin of requests',
        group: SERVER_GROUP,
        default: false,
    })
    .options('proxies', {
        type: 'array',
        describe: 'required, defining sources and target proxy api',
        group: 'Proxies:',
    })
    .options('log', {
        type: 'string',
        describe: 'logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]',
        default: 'ALL',
    })
    .help('help')
    .version()
    .alias('v', 'version')
    .alias('h', 'help')
    .wrap(null)
    .argv;

module.exports = argv;
