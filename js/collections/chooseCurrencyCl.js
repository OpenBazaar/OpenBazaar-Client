'use strict';

/* this reuses the country model */

var Backbone = require('backbone'),
    ChooseCountry = require('../models/chooseCountryMd');

module.exports = Backbone.Collection.extend({
  model: ChooseCountry
});