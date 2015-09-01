var Backbone = require('backbone'),
    ItemShort = require('../models/itemShortMd');

module.exports = Backbone.Collection.extend({
  model: ItemShort
});