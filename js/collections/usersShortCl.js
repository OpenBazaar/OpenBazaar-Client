var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    userShort = require('../models/userShortMd');

module.exports = Backbone.Collection.extend({
  model: userShort,

  initialize: function(models, options){

    /*
    if (!options.fetchURL) {
      throw new Error('Please provide a collection.');
    }
    
    this.fetchURL = options.fetchURL;*/
  },


  url: function() {
    return app.serverConfigs.getActive().getServerBaseUrl() + '/' + this.fetchURL;
  }
});