var __ = require('underscore');

function localizeShippingRegions(regions) {
  var localized = [];

  if (!__.isArray(regions)) {
    throw new Error('Please provide an array of country dataNames.');
  }

  regions.forEach((region) => {
    if (region === 'ALL') {
      localized.push(polyglot.t('WorldwideShipping'));
    } else {
      localized.push(polyglot.t(`countries.${region}.name`));
    }
  });

  return localized;
}

module.exports = {
  localizeShippingRegions: localizeShippingRegions
}