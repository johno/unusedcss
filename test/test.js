var assert = require('assert');
var unusedCss = require('..');

describe('unusedCss', function() {
  this.timeout(5000);

  it('should return data', function(done) {
    unusedCss('http://johnotander.com', function(css) {
      assert.ok(css);
      done();
    });
  });
});
