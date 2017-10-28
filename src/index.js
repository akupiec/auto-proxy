const config = require('./config');
const proxySever = require('./proxyServer')(config);
const Logger = require('./logger')(config);
const server = require('./server');

Logger.trace('All config Props: ', JSON.stringify(config));

server(proxySever, config, Logger);