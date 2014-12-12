# UnusedCSS

_Currently under development._

[![Build Status](https://travis-ci.org/johnotander/unusedcss.svg?branch=master)](https://travis-ci.org/johnotander/unusedcss)

Retrieve the unused CSS from a web page. This is useful for page analytics.

## Installation

```
npm i --save unusedcss
```

## Usage

```javascript
var unusedCss = require('unusedcss');

unusedCss('https://google.com');
```

#### Using the CLI

```
unusedcss [url]
```

## Acknowledgements

Relies heavily upon [uncss](https://github.com/giakki/uncss) and [rework-css](https://github.com/reworkcss/css).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
