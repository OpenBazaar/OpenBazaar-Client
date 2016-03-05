var Backbone = require('backbone'),
    app = require('../App.js').getApp(),
    StatusMessageMd = require('../models/statusMessageMd');

module.exports = Backbone.Collection.extend({
  model: StatusMessageMd
});