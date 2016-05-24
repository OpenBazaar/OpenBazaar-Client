var __ = require('underscore');

function localizeShippingRegions(regions) {
  var localized = [];

  if (!__.isArray(regions)) {
    throw new Error('Please provide an array of country dataNames.');
  }

  regions.forEach((region) => {
    if (region === 'ALL') {
      localized.push(window.polyglot.t('WorldwideShipping'));
    } else {
      localized.push(window.polyglot.t(`countries.${region}`));
    }
  });

  return localized;
}

module.exports = {
  localizeShippingRegions: localizeShippingRegions
};