DownPloader
=========

A small nodejs library providing utility methods for download and upload files through http(s)

## Installation

  npm install downploader --save

## Usage

```
  var dp = require('downploader')
      download = dp.download,
      upload = dp.upload;

  download("https://website.com/image.jpg", (err, data) => {
    error = err;
    if(!error) {
      fs.writeFileSync('image.jpg', data.read());
    }
  });
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release