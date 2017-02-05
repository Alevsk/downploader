var fs = require('fs');
var Stream = require('stream').Transform;
var should = require('chai').should();
var expect = require('chai').expect;
var downploader = require('../index');
var download = downploader.download;
var upload = downploader.upload;

describe('#downploader', function () {

    it('Download image bytes from a remote server', function (done) {

        var error = null;
        var gravatar = "https://s.gravatar.com/avatar/2752d264c4660441c303e3702ab425db?s=140";
        download(gravatar, (err, data) => {
            error = err;
            if (!error) {
                fs.writeFileSync('test/avatar.jpg', data.read());
            }
            expect(error).equals(null);
            done();
        });
    });

    it('Upload image bytes to a remote server', function (done) {

        var error = null;
        var url_address = "http://localhost/";
        var file = "test/avatar.jpg";
        var readStream = fs.createReadStream(file);
        var bytes = new Stream();

        readStream.on('data', function (chunk) {
            bytes.push(chunk);
        });

        readStream.on('error', function (err) {
            expect(err).equals(null);
            done();
        });

        readStream.on('end', function () {
            upload(bytes, url_address, (err, data) => {
                error = err;
                expect(error).equals(null);
                done();
            });
        });

    });
});