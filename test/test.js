var assert = require('assert');
var unusedCss = require('..');

describe('unusedCss', function() {
  this.timeout(15000);

  it('should return data', function(done) {
    unusedCss('http://johnotander.com/contact', function(css) {
      console.log(css);
      done();
    });
  });
});
