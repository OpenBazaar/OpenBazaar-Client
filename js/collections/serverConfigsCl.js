'use strict';

var Backbone = require('backbone'),
    localStorageSync = require('../utils/backboneLocalStorage'),
    ServerConfigMd = require('../models/serverConfigMd');

module.exports = Backbone.Collection.extend({
  sync: localStorageSync.sync,
  localStorage: new localStorageSync('__serverConfig'),  
  model: ServerConfigMd,

  getActive: function() {
    var config = this.get(localStorage.activeServer);

    if (!config && this.length) {
      config = this.at(this.length - 1);
      this.setActive(config.id);
    }

    return config;  
  },

  setActive: function(id) {
    var md;

    if (!(md = this.get(id))) {
      throw new Error(`Unable to set the active server config. It must be an id of one of the available
          server configs stored in this collection.`);
    }

    if (this._active !== id) {
      this._active = id;
      localStorage.activeServer = id;
      this.trigger('activeServerChange', md);
    }
  }
});