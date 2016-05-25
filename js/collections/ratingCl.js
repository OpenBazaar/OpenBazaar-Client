'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    RatingMd = require('../models/ratingMd');

module.exports = Backbone.Collection.extend({
  url: function() {
    return app.serverConfigs.getActive().getServerBaseUrl() + '/get_ratings';
  },

  model: RatingMd,

  parse: function(response) {
    if (!response || __.isEmpty(response)) {
      return [];
    }

    return response;
  }
});