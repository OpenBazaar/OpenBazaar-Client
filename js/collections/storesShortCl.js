var Backbone = require('backbone'),
    StoreShort = require('../models/storeShortMd');

module.exports = Backbone.Collection.extend({
  model: StoreShort
});