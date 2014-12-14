var assert = require('assert');
var unusedCss = require('..');

describe('unusedCss', function() {
  this.timeout(5000);

  it('should return the correct stats', function(done) {
    unusedCss('http://johnotander.com', function(stats) {
      assert.ok(stats);
      assert.ok(stats.selectors);
      assert.ok(stats.declarations);
      done();
    });
  });
});
