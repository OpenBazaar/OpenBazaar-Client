var Backbone = require('backbone'),
    localStorageSync = require('../utils/backboneLocalStorage'),
    is = require('is_js');

module.exports = Backbone.Model.extend({
  defaults: {
    'id': 1,
    'server_ip': 'localhost',
    'rest_api_port': 18342,
    'socket_port': 18342
  },

  sync: localStorageSync.sync,

  localStorage: new localStorageSync('_serverConfig'),

  _addError: function(errObj, fieldName, error) {
    errObj = errObj || {};
    errObj[fieldName] = errObj[fieldName] || [];
    errObj[fieldName].push(error);
  },

  validate: function(attrs, options) {
    var err = {};

    if (is.empty(attrs.server_ip)) {
      this._addError(err, 'server_ip', 'Please provide a value.');
    } else {
      if (!is.ip(attrs.server_ip)) {
        this._addError(err, 'server_ip', 'This does not appear to be a valid IP address.');
      }      
    }

    if (is.empty(attrs.rest_api_port)) {
      this._addError(err, 'rest_api_port', 'Please provide a value.');
    } else {
      if (!is.within(attrs.rest_api_port, 0, 65535)) {
        this._addError(err, 'rest_api_port', 'Please provide a number between 0 and 65535.');
      }
    }

    if (is.empty(attrs.socket_port)) {
      this._addError(err, 'socket_port', 'Please provide a value.');
    } else {
      if (!is.within(attrs.socket_port, 0, 65535)) {
        this._addError(err, 'socket_port', 'Please provide a number between 0 and 65535.');
      }
    }    

    return Object.keys(err).length && err || undefined;
  },

  getServerBaseUrl: function() {
    return 'http://' + this.get('server_ip') + ':' + this.get('rest_api_port') + '/api/v1'
  }
});
