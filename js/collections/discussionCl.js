'use strict';

var Backbone = require('backbone'),
    chatMessage = require('../models/chatMessageMd');


module.exports = Backbone.Collection.extend({

  model: chatMessage

});