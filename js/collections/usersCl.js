var Backbone = require('backbone'),
    user = require('../models/userProfileMd');

module.exports = Backbone.Collection.extend({
  model: user
});