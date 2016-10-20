'use strict';

var __ = require('underscore');

module.exports = window.Backbone.Model.extend({
  defaults: {
    type: 'msg',
    duration: 2500
  },

  validate: function(attrs) {
    var err = {};

    attrs = attrs || {};

    if (attrs.type && ['msg', 'warning', 'confirmed', 'pending'].indexOf(attrs.type) === -1) {
      err['type'] = `Type must be 'msg', 'warning', 'confirmed', or 'pending'`;
    }

    if (attrs.duration && !__.isNumber(attrs.duration)) {
      err['duration'] = 'Duration must be a number';
    }    

    if (!attrs.msg || !__.isString(attrs.msg)) {
      err['msg'] = 'Msg is required and must be a string.';
    }    

    if (Object.keys(err).length > 0) {
      return err;
    }
  }
});
