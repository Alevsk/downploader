var fs = require('fs');
var should = require('chai').should();
var expect = require('chai').expect;
var downploader = require('../index');
var download = downploader.download;

describe('#download', function() {

    it('Download image from remote server', function(done) {

        var error = null;
        var gravatar = "https://s.gravatar.com/avatar/2752d264c4660441c303e3702ab425db?s=140";
        download(gravatar, (err, data) => {
            error = err;
            if(!error) {
                fs.writeFileSync('test/avatar.jpg', data.read());
            }
            expect(error).equals(null);
            done();
        });
    });
});