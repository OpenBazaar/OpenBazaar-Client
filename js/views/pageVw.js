'use strict';

var BaseVw = require('./baseVw'),
    PageVw;

PageVw = BaseVw.extend({
  cacheExpires: 1000 * 60 * 20,
  
  // should be function that returns a boolean
  restoreScrollPosition: function(opts) {
    var splitRoute = opts.route.split('/');

    // !!!! if state will not be in the second position
    // in the route of your view (e.g. myPage/<state>) or
    // your view does not store it's state as a string in
    // this.state, then overwrite this method.

    if (splitRoute[1] === this.state) {
      // if our routed state equals our cached state, we would
      // like to restore the cached scroll position.
      return true;
    }
  }
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