'use strict';

var BaseVw = require('./baseVw');

module.exports = BaseVw.extend({
  // todo: make into function and increase to 20 min
  cacheExpires: 1000 * 10 * 1,

  restoreScrollPosition: true,

  getCacheIndex: function(fragment) {
    if (!fragment) {
      throw new Error('The fragment is empty. If you want your view to support being' +
        'indexed by an empty fragment, please override this method in your view' +
        'and return a hard-coded string identifier if an empty fragment is passed in.');
    }

    return fragment.split('/')[0];
  }  
});