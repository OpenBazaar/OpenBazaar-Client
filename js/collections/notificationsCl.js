var Backbone = require('backbone'),
    notification = require('../models/notificationMd');


module.exports = Backbone.Collection.extend({

  model: notification,

  initialize: function(options) {
  }

});