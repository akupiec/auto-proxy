/* eslint-disable indent */

module.exports = {
    server: { //local server configuration block
        port: 8088, // [required]
    },
    proxy: { //reverse proxy configuration block
        changeOrigin: true,
        secure: true,
        disabled: false, //Disable proxy, only locally available files will be served
    },
    proxies: [ // ... it's kind'of required block
        {
            path: '/services', // [required] poxed url path to target
            target: 'http://google.com', // [required] proxy target
                                        // This mean all request done to http://localhost:8088/services/*
                                        // will be delegated to http://google.com/services/*
            cache: { //cache configuration block
                enabled: true, //save new cache files & serve them when match request
                meta: 'NONE', // Responsible for storing request/response meta data.
                              // Response section will be used each time cached file will be used.
                              // 'NONE' - all cached files will ack like successful responses (code 200).
                              // 'OPTIONAL' - new meta won't be stored but will be used if present.
                              // 'ERRORS' - meta will be stored only for responses codes different then 200
                              // 'ALL' - each new file will be saved with corresponding meta file
                // hashing: true, //TODO: file names will contain crc32 hash based on query & payload request, instead of plain text
                // madCache: true, //TODO: cache all request's (even 404) will be cached as success (200)
                                //Requires disabled meta storing
                // filtering: { //describes what should be cached
                //     //TODO
                // },
            },
        },
        {
            path: '/public',
            target:  '../assets/public', //target can point to local directory as well
                                         //this will work as simply static server
            // cache: { //sorry but caching local files is not supported
            // },
        },
        {
            path: '/',
            target: '../other_public/index.html', // serving single file ? wny not ?
        },
    ],
    mock: './mockDir', //directory for cached files
    log: 'DEBUG', // logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]
};