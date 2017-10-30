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
                                        // This basally mean all request done to http://localhost:8088/services/*
                                        // will be delegated to http://google.com/services/*
            cache: { //cache configuration block
                enabled: true, //save new cache files & serve them when match request
                meta: false, //TODO: store request/response meta (headers, resp code)
                             //When set to false all cached files will be served with 200 response code with minimum meta data
                hashing: true, //TODO: file names will contain crc32 hash based on query & payload request, instead of plain text
                madCache: true, //TODO: cache all request's (even 404) will be cached as success (200)
                                //Requires disabled meta storing
                filtering: { //describes what should be cached
                    //TODO
                },
            },
        },
        {
            path: '/public',
            target:  '../assets/public', //target can point to local directory as well
                                         //this will work as simply static server
            cache: {
                enabled: false, //sorry but caching local files is not supported at the moment
            },
        },
        {
            path: '/',
            target: '../other_public/index.html', // serving single file ? wny not ?
        },
    ],
    mock: './mockDir', //directory for cached files
    log: 'DEBUG', // logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]
};