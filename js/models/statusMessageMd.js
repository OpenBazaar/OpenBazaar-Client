var __ = require('underscore'),
    Backbone = require('backbone');

module.exports = window.Backbone.Model.extend({
  defaults: {
    type: 'msg',
    duration: 2500
  },

  validate: function(attrs) {
    var err = {};

    attrs = attrs || {};

    if (attrs.type && ['msg', 'warning'].indexOf(attrs.type) === -1) {
      err['type'] = `Type must be 'msg' or 'warning'`;
    }

    if (attrs.duration && !__.isNumber(attrs.duration)) {
      err['duration'] = 'Duration must be a number';
    }    

    if (!attrs.msg || !__.isString(attrs.msg)) {
      err['msg'] = 'Msg is required and must be a string.';
    }    

    return Object.keys(err).length && err || undefined;
  }
});