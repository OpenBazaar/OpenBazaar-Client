var Backbone = require('backbone'),
    localStorageSync = require('../utils/backboneLocalStorage'),
    is = require('is_js');

module.exports = Backbone.Model.extend({
  defaults: {
    'id': 1,
    'server_ip': 'localhost',
    'rest_api_port': 18469,
    'api_socket_port': 18466,
    'heartbeat_socket_port': 18470
  },

  sync: localStorageSync.sync,

  localStorage: new localStorageSync('_serverConfig'),

  _addError: function(errObj, fieldName, error) {
    errObj = errObj || {};
    errObj[fieldName] = errObj[fieldName] || [];
    errObj[fieldName].push(error);
  },

  parse: function(response) {
    response = this.castIntegerFields(response);

    Backbone.Model.prototype.parse.apply(this, arguments);
  },

  castIntegerFields: function(attrs) {
    var parsed;

    if (typeof attrs.rest_api_port !== undefined) {
      parsed = parseInt(attrs.rest_api_port);
      
      if (isNaN(parsed)) {
        delete attrs.rest_api_port;
      } else {
        attrs.rest_api_port = parsed;
      }
    }

    if (typeof attrs.api_socket_port !== undefined) {
      parsed = parseInt(attrs.api_socket_port);
      
      if (isNaN(parsed)) {
        delete attrs.api_socket_port;
      } else {
        attrs.api_socket_port = parsed;
      }
    }

    if (typeof attrs.heartbeat_socket_port !== undefined) {
      parsed = parseInt(attrs.heartbeat_socket_port);
      
      if (isNaN(parsed)) {
        delete attrs.heartbeat_socket_port;
      } else {
        attrs.heartbeat_socket_port = parsed;
      }
    }    

    return attrs;
  },

  validate: function(attrs, options) {
    var err = {};

    attrs = this.castIntegerFields(attrs);

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
      if (!is.within(attrs.rest_api_port, -1, 65536)) {
        this._addError(err, 'rest_api_port', 'Please provide a number between 0 and 65535.');
      }
    }

    if (is.empty(attrs.api_socket_port)) {
      this._addError(err, 'api_socket_port', 'Please provide a value.');
    } else {
      if (!is.within(attrs.api_socket_port, -1, 65536)) {
        this._addError(err, 'api_socket_port', 'Please provide a number between 0 and 65535.');
      }
    }    

    if (is.empty(attrs.heartbeat_socket_port)) {
      this._addError(err, 'heartbeat_socket_port', 'Please provide a value.');
    } else {
      if (!is.within(attrs.heartbeat_socket_port, -1, 65536)) {
        this._addError(err, 'heartbeat_socket_port', 'Please provide a number between 0 and 65535.');
      }
    }    

    return Object.keys(err).length && err || undefined;
  },

  getServerBaseUrl: function() {
    return 'http://' + this.get('server_ip') + ':' + this.get('rest_api_port') + '/api/v1';
  },

  getHeartbeatSocketUrl: function() {
    return 'ws://' + this.get('server_ip') + ':' + this.get('heartbeat_socket_port');
  },

  getApiSocketUrl: function() {
    return 'ws://' + this.get('server_ip') + ':' + this.get('api_socket_port');
  },

  isLocalServer: function() {
    var ip = this.get('server_ip');

    return ip === 'localhost' || ip === '127.0.0.1';
  }  
});
