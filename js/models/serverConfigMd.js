'use strict';

var Backbone = require('backbone'),
    localStorageSync = require('../utils/backboneLocalStorage'),
    is = require('is_js');

module.exports = Backbone.Model.extend({
  defaults: {
    'server_ip': 'localhost',
    'rest_api_port': 18469,
    'api_socket_port': 18466,
    'heartbeat_socket_port': 18470,
    'SSL': false,
    'default': false
  },  

  sync: localStorageSync.sync,

  localStorage: new localStorageSync('__serverConfig'),

  _addError: function(errObj, fieldName, error) {
    errObj = errObj || {};
    errObj[fieldName] = errObj[fieldName] || [];
    errObj[fieldName].push(error);
  },


  validate: function(attrs) {
    var err = {},
        models;

    if (!is.existy(attrs.name) || is.empty(attrs.name)) {
      this._addError(err, 'name', 'Please provide a value.');
    } else {
      if (this.__collection) {
        models = this.__collection.where({ name: attrs.name });
        if (models && models.length && (models.length > 1 || models[0].id !== attrs.id)) {
          this._addError(err, 'name', 'Configuration name is already in use.');
        }
      }
    }

    if (!is.existy(attrs.server_ip) || is.empty(attrs.server_ip)) {
      this._addError(err, 'server_ip', 'Please provide a value.');
    } else {
      if (!is.ip(attrs.server_ip)) {
        this._addError(err, 'server_ip', 'This does not appear to be a valid IP address.');
      }      
    }

    if (!is.number(attrs.rest_api_port)) {
      this._addError(err, 'rest_api_port', 'Please provide a number.');
    } else {
      if (!is.within(attrs.rest_api_port, -1, 65536)) {
        this._addError(err, 'rest_api_port', 'Please provide a number between 0 and 65535.');
      }
    }

    if (!is.number(attrs.api_socket_port)) {
      this._addError(err, 'api_socket_port', 'Please provide a number.');
    } else {
      if (!is.within(attrs.api_socket_port, -1, 65536)) {
        this._addError(err, 'api_socket_port', 'Please provide a number between 0 and 65535.');
      }
    }    

    if (!is.number(attrs.heartbeat_socket_port)) {
      this._addError(err, 'heartbeat_socket_port', 'Please provide a number.');
    } else {
      if (!is.within(attrs.heartbeat_socket_port, -1, 65536)) {
        this._addError(err, 'heartbeat_socket_port', 'Please provide a number between 0 and 65535.');
      }
    }    

    if (!attrs.default) {
      if (!is.existy(attrs.username) || is.empty(attrs.username)) {
        this._addError(err, 'username', 'Please provide a value.');
      }

      if (!is.existy(attrs.password) || is.empty(attrs.password)) {
        this._addError(err, 'password', 'Please provide a value.');
      }
    }

    if (Object.keys(err).length > 0) {
      return err;
    }
  },

  getServerBaseUrl: function() {
    var prefix = this.get('SSL') ? "https" : "http";
    return prefix + '://' + this.get('server_ip') + ':' + this.get('rest_api_port') + '/api/v1';
  },

  getHeartbeatSocketUrl: function() {
    var prefix = this.get('SSL') ? "wss" : "ws";
    return prefix + '://' + this.get('server_ip') + ':' + this.get('heartbeat_socket_port');
  },

  getApiSocketUrl: function() {
    var prefix = this.get('SSL') ? "wss" : "ws";
    return prefix + '://' + this.get('server_ip') + ':' + this.get('api_socket_port');
  },

  isLocalServer: function() {
    var ip = this.get('server_ip');

    return ip === 'localhost' || ip === '127.0.0.1';
  }  
});
