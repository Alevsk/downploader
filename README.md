DownPloader
=========

A small nodejs library providing utility methods for download and upload files through http(s)

## Installation

```
  npm install --save downploader
```

## Usage examples

#### Download

```
  var fs = require('fs');
  var dp = require('downploader');
  var download = dp.download;

  download("https://website.com/image.jpg", (err, data) => {
      if(!err) {
          fs.writeFileSync('image.jpg', data.read());
      }
  });
```

#### Upload

```
  var fs = require('fs');
  var Stream = require('stream').Transform;
  var dp = require('downploader');
  var upload = dp.upload;

  var file = "image.jpg";
  var readStream = fs.createReadStream(file);
  var bytes = new Stream();

  readStream.on('data', function (chunk) {
      bytes.push(chunk);
  });

  readStream.on('error', function (err) {
      console.log(err);
  });

  readStream.on('end', function () {
      upload(bytes, "http://localhost/", (err, data) => {
          if(err) {
            console.log(err);
          } else {
            console.log(data.read())
          }
      });
  });
```

## Tests

```
  $ while true; do { echo -e 'HTTP/1.1 200 OK\r\n'; } | sudo nc -l 80; done // start a simple http server for test upload
  $ npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release