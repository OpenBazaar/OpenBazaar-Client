var Backbone = require('backbone'),
    notifications = require('../models/notificationsMd');


module.exports = Backbone.Collection.extend({

  model: notifications,

  initialize: function(options) {
  }

});