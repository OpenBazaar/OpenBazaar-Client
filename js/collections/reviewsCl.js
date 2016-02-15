var Backbone = require('backbone'),
    app = require('../App.js').getApp();

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfig.getServerBaseUrl() + '/get_ratings';
  },

  model: Backbone.Model,

  initialize: function(options) {
  }
});