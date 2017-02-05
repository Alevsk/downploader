var https = require('https');
var http = require('http');
var url = require('url');
var random_ua = require('random-ua');
var Stream = require('stream').Transform;

/**
 * Callback to be executed after file download/upload is complete.
 *
 * @callback handleResponse
 * @param {String} error Error received from the server (if exists)
 * @param {Stream} data Stream of bytes that contains the server response
 */
module.exports = {
    /**
     * Download a stream of bytes for a given URL
     *
     * @param  {String} url_address The remote url used for download the file
     * @param  {handleResponse} callback Callback to be executed after file download is complete
     * @param  {Object} option Options allow to define custom arguments for the HTTP(s) connection
     */
    download: function (url_address, callback, options) {
        var parsedURL = null;
        try {
            parsedURL = url.parse(url_address);
        } catch (err) {
            callback(err, null);
        }

        if (!parsedURL.hostname) {
            callback("Invalid URL provided", null);
        }

        if (!options) {
            options = {
                host: parsedURL.hostname,
                port: (parsedURL.protocol == 'https:') ? 443 : 80,
                path: parsedURL.path,
                method: 'GET',
                encoding: 'binary',
                headers: {
                    'User-Agent': random_ua.generate(),
                }
            }
        }

        var client = (parsedURL.protocol == 'https:') ? https : http;
        client.request(options, function (response) {

            var data = new Stream();

            response.on('data', function (chunk) {
                data.push(chunk);
            });

            response.on('error', function (err) {
                callback(err, null)
            });

            response.on('end', function () {
                callback(null, data)
            });

        }).on('error', (err) => {
            callback(err, null)
        }).end();

    },
    /**
     * Upload a stream of bytes to a given URL
     *
     * @param  {Stream} data Bytes to be sent to the remote url address
     * @param  {String} url_address The remote url used for upload the file bytes
     * @param  {handleResponse} callback Callback to be executed after file upload is complete
     * @param  {Object} option Options allow to define custom arguments for the HTTP(s) connection
     */
    upload: function (data, url_address, callback, options) {
        var parsedURL = null;
        try {
            parsedURL = url.parse(url_address);
        } catch (err) {
            callback(err, null);
        }

        if (!parsedURL.hostname) {
            callback("Invalid URL provided", null);
        }

        if (!options) {
            options = {
                host: parsedURL.hostname,
                port: (parsedURL.protocol == 'https:') ? 443 : 80,
                path: parsedURL.path,
                method: 'POST',
                headers: {
                    'User-Agent': random_ua.generate(),
                }
            }
        }

        var client = (parsedURL.protocol == 'https:') ? https : http;
        client.request(options, (response) => {
            var str = new Stream();
            response.on('error', function (err) {
                callback(err, null)
            });
            response.on('data', function (chunk) {
                str.push(chunk);
            });
            response.on('end', function () {
                callback(null, str);
            });

        }).on('error', (err) => {
            callback(err, null)
        }).end(data.read());

    },

};