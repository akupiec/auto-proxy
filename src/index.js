const config = require('./config');
const LOGGER = require('./logger');
const server = require('./server');

LOGGER.trace('All config Props: ', JSON.stringify(config));

server(config);