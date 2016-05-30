'use strict';

var BaseVw = require('./baseVw'),
    PageVw;

PageVw = BaseVw.extend({
  cacheExpires: 1000 * 60 * 20
});

// this must be a "static" method and overridden as such (if you
// are overriding), since the router doesn't have an instance
// when it's deciding whether to create a new one or use a cached one.
PageVw.getCacheIndex = function(fragment) {
  if (!fragment) {
    throw new Error('The fragment is empty. If you want your view to support being ' +
      'indexed by an empty fragment, please override this method in your view ' +
      'and return a hard-coded string identifier if an empty fragment is passed in.');
  }

  return fragment.split('/')[0];
};  

module.exports = PageVw;