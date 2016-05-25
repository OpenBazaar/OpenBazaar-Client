'use strict';

var Backbone = require('backbone'),
    StoreShort = require('../models/userShortMd');

module.exports = Backbone.Collection.extend({
  model: StoreShort
});