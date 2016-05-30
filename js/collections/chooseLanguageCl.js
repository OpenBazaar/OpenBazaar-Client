'use strict';

/* this reuses the country model */

var Backbone = require('backbone'),
    ChooseLanguage = require('../models/chooseLanguageMd');

module.exports = Backbone.Collection.extend({
  model: ChooseLanguage
});