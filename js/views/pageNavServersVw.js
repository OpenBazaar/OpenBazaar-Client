'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    BaseVw = require('./baseVw'),
    PageConnectModal = require('./pageConnectModal');

module.exports = BaseVw.extend({
  className: 'flexContainer',

  events: {
    'click .js-newServer': 'onClickNewServer',
    'click .js-manageServers': 'onClickManageServers',
    'click .js-pageNavServer': 'onClickServer'
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a ServerConfigs collection.');
    }

    this.listenTo(this.collection, 'update', this.render);
  },

  onClickNewServer: function(e) {
    app.serverConnectModal.showConfigForm()
      .open();
  },

  onClickManageServers: function(e) {
    app.serverConnectModal.open();
  },

  onClickServer: function(e) {
    var $target = $(e.target).hasClass('js-pageNavServer') ?
          $(e.target) : $(e.target).parents('.js-pageNavServer'),
        serverConfig = app.serverConfigs.get($target.data('server-config-id'));

    // launch page connect modal
    this.pageConnectModal && this.pageConnectModal.remove()
    this.pageConnectModal = new PageConnectModal({
      className: 'server-connect top0',
      initialState: {
        statusText: serverConfig.get('default') ?
          polyglot.t('serverConnectModal.connectingToDefault') :
          polyglot.t('serverConnectModal.connectingTo', { serverName: serverConfig.get('name') })
      }
    }).on('cancel', () => {
      this.pageConnectModal.remove();
      app.serverConnectModal.open();      
    }).open();

    app.serverConnectModal.connect(serverConfig)
      .done(() => {
        this.pageConnectModal.remove();
      }).fail(() => {
        this.pageConnectModal.remove();
        app.serverConnectModal.open();
      });
  },

  render: function() {
    var connectedServerConfig = app.serverConnectModal.getConnectedServer();

    loadTemplate('./js/templates/pageNavServersMenu.html', (t) => {
      this.$el.html(t({
        connectedServer: connectedServerConfig && connectedServerConfig.id,
        servers: this.collection.toJSON()
      }));
    });

    return this;
  }
});
