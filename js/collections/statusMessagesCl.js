'use strict';

var Backbone = require('backbone'),
    StatusMessageMd = require('../models/statusMessageMd');

module.exports = Backbone.Collection.extend({
  model: StatusMessageMd
});