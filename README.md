# Mad Proxy

[![Travis](https://img.shields.io/travis/akupiec/mad-proxy.svg)](https://travis-ci.org/akupiec/mad-proxy.svg?branch=master)
[![license](https://img.shields.io/github/license/akupiec/mad-proxy.svg)]()


Auto caching reverse proxy, with partial static server -
highly useful for testing UI applications when backed is slow or temporary unavailable.

## Installation Steps

Currently I do not have any plans for npm release, or any kind long term support
(At least before finishing version 1.0.0).
Moreover you're propably looking for something else.

1. check npm if there is anything better, if not - then you may proceed. (if there is let me known ^_^ )
1. manually download *.tgz file release.
1. install package by npm/yarn ex: `npm install URL_TO_RELEASE`
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

There is possibility to ignore hash and always return same file,
just rename ones generated file and set hash to *evil one* (#666)