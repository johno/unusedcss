var unCss = require('uncss');
var css = require('css');
var getCss = require('get-css');
var isBlank = require('is-blank');

module.exports = function unusedCss(url, callback) {
  var originalCss, usedCss;
  getCss(url).then(function(response) {
    originalCss = hashDeclarationsBySelector(css.parse(response.css).stylesheet.rules);

    unCss([url], { report: true }, function(error, output) {
      usedCss = hashDeclarationsBySelector(css.parse(output).stylesheet.rules);

      callback();
    });
  });
};

// Hash declarations with their selector as the key.
// O(n) lookup, ftw.
function hashDeclarationsBySelector(cssArray) {
  var cssHash = {};

  cssArray.filter(function(cssObj) {
    // We only care about rules here.
    return cssObj.type === 'rule';
  }).forEach(function(cssObj) {
    // Iterate over all the rules.
    cssObj.selectors.forEach(function(selector) {
      // Concatenate the declarations for each selector.
      if (isBlank(cssHash[selector])) {
        cssHash[selector] = [];
      }

      cssHash[selector] = cssHash[selector].concat(cssObj.declarations);
    });
  });

  return cssHash;
}
