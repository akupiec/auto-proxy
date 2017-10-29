/* globals process */
const yargs = require('yargs');

const GENERAL_GROUP = 'General:';
const SERVER_GROUP = 'Local Server:';
const PROXY_GROUP = 'Proxy Server:';
const argv = yargs.usage('$0 cli usage:')
    .option('config', {
        alias: 'c',
        describe: 'Path to the config file, accepts js|json. All cli options can be override by configuration file.',
        type: 'string',
        group: GENERAL_GROUP,
        // default: 'auto-proxy.json',
    })
    .options('mock', {
        alias: 'm',
        describe: 'destination path where mocks will be stored',
        group: GENERAL_GROUP,
    })
    .options('server.port', {
        alias: ['port'],
        type: 'number',
        describe: 'local server port',
        group: SERVER_GROUP,
    })
    .options('server.fallback', {
        type: 'string',
        describe: 'File served by default when nothing else fits ex. local index.html',
        group: SERVER_GROUP,
    })
    .options('proxy.target', {
        alias: ['target'],
        type: 'string',
        describe: 'proxy destination serer url',
        group: PROXY_GROUP,
    })
    .options('proxy.secure', {
        alias: ['secure'],
        group: PROXY_GROUP,
    })
    .options('proxy.changeOrigin', {
        describe: 'Proxy changes origin of requests',
        group: PROXY_GROUP,
    })
    .options('proxy.disabled', {
        describe: 'Disable proxy, only already cached files will be served.',
        group: PROXY_GROUP,
    })
    .options('log', {
        type: 'string',
        describe: 'logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]',
    })
    .help('help')
    .version()
    .alias('v', 'version')
    .alias('h', 'help')
    .wrap(null)
    .argv;

module.exports = argv;
