'use strict';

var Backbone = require('backbone'),
    userShort = require('../models/userShortMd');

module.exports = Backbone.Collection.extend({
  model: userShort
});