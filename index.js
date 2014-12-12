var uncss = require('uncss');

module.exports = function unusedCss(url, cb) {
  uncss(url, { }, cb);
};
