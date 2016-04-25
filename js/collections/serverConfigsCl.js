var Backbone = require('backbone'),
    localStorageSync = require('../utils/backboneLocalStorage'),
    ServerConfigMd = require('../models/serverConfigMd');

module.exports = Backbone.Collection.extend({
  sync: localStorageSync.sync,
  localStorage: new localStorageSync('__serverConfig'),  
  model: ServerConfigMd
});