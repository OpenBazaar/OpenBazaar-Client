var Backbone = require('backbone'),
    ItemShort = require('../models/itemShortMd');

module.exports = Backbone.Collection.extend({
  model: ItemShort,

  //url just for testing
  url: "http://bitcoinauthenticator.org:18469/api/v1/get_listings"
});