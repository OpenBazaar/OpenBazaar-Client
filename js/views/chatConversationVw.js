var Backbone = require('backbone'),
  $ = require('jquery'),
  moment = require('moment'),
  app = require('../App.js').getApp(),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  ChatMessageVw = require('./chatMessageVw');

module.exports = baseVw.extend({
  className: 'chatConversation c12345hatConversationHidden',

  events: {
    'click .js-closeConversation': 'onClickClose',
    'keydown textarea': 'onKeydownMessage',
    'keyup textarea': 'onKeyupMessage'
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    if (!options.user) {
      throw new Error('Please provide the model of the logged-in user.');
    }

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    this.user = this.options.user;

    this.collection.fetch({
      data: {
        guid: this.model.get('guid')
      }
    });

    this.listenTo(this.collection, 'sync', () => {
      this.renderMessages();
    });

    this.listenTo(this.collection, 'request', () => {
      this.$messagesContainer.empty();
      this.$loadingSpinner.removeClass('hide');
    });
  },

  onClickClose: function() {
    this.trigger('close-click');
  },

  onKeydownMessage: function(e) {
    var code = e.keyCode || e.which,
        val = this.$msgTextArea.val();
    
    if (code === 13 && !val.trim()) {
      e.preventDefault();
    }
  },

  onKeyupMessage: function(e) {
    var code = e.keyCode || e.which,
        val = this.$msgTextArea.val();
    
    if (code === 13 && val.trim()) {
      this.trigger('enter-message', val);
    }
  },

  getMessageField: function() {
    return this.$msgTextArea;
  },

  renderMessages: function() {
    var $container = $('<div />');

    this.$loadingSpinner.addClass('hide');

    if (this.msgViews) {
      this.msgViews.forEach((vw, index) => {
        vw.remove();
      });
    }

    this.msgViews = [];

    this.collection.forEach((md, index) => {
      var vw = new ChatMessageVw({
        model: md,
        user: this.user
      });

      this.msgViews.push(vw);
      this.registerChild(vw);
      $container.append(vw.render().el);
    });

    this.$messagesContainer.html($container);
    this.$messagesScrollContainer[0].scrollTop = this.$messagesScrollContainer[0].scrollHeight;
  },

  render: function() {
    loadTemplate('./js/templates/chatConversation.html', (tmpl) => {
      this.$el.html(
        tmpl(__.extend(this.model.toJSON(), {
          serverUrl: app.serverConfig.getServerBaseUrl(),
          moment: moment
        }))
      );

      this.$('.chatConversationMessage textarea').focus()
      this.$messagesScrollContainer = this.$('.chatConversationContent');
      this.$loadingSpinner = this.$messagesScrollContainer.find('.js-loadingSpinner');
      this.$messagesContainer = this.$messagesScrollContainer.find('.js-messagesContainer');
      this.$msgTextArea = this.$('textarea');
    });

    return this;
  }
});