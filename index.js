var unCss = require('uncss');
var css = require('css');
var getCss = require('get-css');
var isBlank = require('is-blank');
var cssStats = require('css-statistics');
var _ = require('lodash');

module.exports = function unusedCss(url, callback) {
  var unusedSelectors = [];
  var unusedDeclarations = [];

  getCss(url).then(function(response) {
    var originalCss = css.parse(response.css).stylesheet.rules;

    unCss([url], { report: true }, function(error, output) {
      var usedCss = hashDeclarationsBySelector(css.parse(output).stylesheet.rules);

      originalCss.filter(function(cssObj) {
        // We only care about CSS rules.
        return cssObj.type === 'rule';
      }).forEach(function(cssObj) {
        // Filter the selectors to those that were used
        var unusedSelectorsForObj = cssObj.selectors.filter(function(selector) {
          return !usedCss[selector];
        });

        // See if any selectors were used, add declarations to unused list if not.
        if (unusedSelectorsForObj.length === cssObj.selectors.length) {
          unusedDeclarations = unusedDeclarations.concat(cssObj.declarations);
        }

        // Add unused selectors to the unused selector list.
        unusedSelectors = _.union(unusedSelectors, unusedSelectorsForObj);
      });

      callback({
        selectors: unusedSelectors,
        declarations: unusedDeclarations,
        selectorsCount: unusedSelectors.length,
        declarationsCount: unusedDeclarations.length
      });
    });
  });
};

// Hash declarations with their selector as the key.
// O(1) lookup, ftw.
function hashDeclarationsBySelector(cssArray) {
  var cssHash = {};

  cssArray.filter(function(cssObj) {
    // We only care about rules here.
    return cssObj.type === 'rule';
  }).forEach(function(cssObj) {
    // Iterate over all the rules.
    cssObj.selectors.forEach(function(selector) {
      cssHash[selector] = true;
    });
  });

  return cssHash;
}
