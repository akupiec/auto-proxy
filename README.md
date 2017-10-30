# Mad Proxy

[![Travis](https://img.shields.io/travis/akupiec/mad-proxy.svg)](https://travis-ci.org/akupiec/mad-proxy)
[![license](https://img.shields.io/github/license/akupiec/mad-proxy.svg)]()


Auto caching reverse proxy, useful when quick mad mocking is required.
Basic idea in mad proxy is to simplify and speed up development process of frontend applications.

**Made for development purposes only !**

Mad Proxy combines reverse proxy functionality with mocking server.
Usually mocking server is too time consuming to maintain,
but on the other hand it is  really helpful when there is  a need to develop new functionality and backend isn't ready yet.

That's why idea to find auto caching reverse proxy came in mind, but it was all in vain (there already is an api-mock-proxy but's too simple in general term, and have quite few other problems)


**WARNING** This app is in development snapshot and propably will never be released.

## Installation Steps

Everything before 1.0.0 should be considered as alpha version.
Breaking changes can happen in minor updates, check [CHANGELOG](CHANGELOG.md) for details.

1. install package by npm/yarn ex: `npm install mad-proxy`
1. create configuration file (yes it's required to create one by hand)
1. run by `mad-proxy -c config.js`

## Configuration
All necessary information's for creating your own config can be found in
[default configuration file](bin/mad-proxy.config.js)

NOTE: Application can parse *.js or *.json configuration file.

## CLI

All commands are described in build in help `mad-proxy --help`.

Cli parameters have higher priority then configuration file
ex `mad-proxy --server.port 8888` will run server on port 8888 ignoring
config file setting for port

## Cache rules

Example file cache can be saved in file:
./mocksDir/rnc-webservices_services/GET/system_configuration_#824ac3d0.json

Where:
```
╔════════════╦═══════════════════════════╦═════════╦══════════════════════╦═══════════╦═══════╗
║  mockDir   ║    proxy contextPath      ║  method ║       full url       ║   hash    ║  ext  ║
╠════════════╬═══════════════════════════╬═════════╬══════════════════════╬═══════════╬═══════╣
║ ./mocksDir ║ /rnc-webservices_services ║ / GET / ║ system_configuration ║ #824ac3d0 ║ .json ║
╚════════════╩═══════════════════════════╩═════════╩══════════════════════╩═══════════╩═══════╝
```

* hash - generated crc code, based on query and payload request or plain text (depends on configuration)
* extension - based on response content-type header (ignored by cache validator)

**NOTES**

There is a possibility to ignore hash and always return same file,
just rename generated one and set hash to *evil one* (#666)