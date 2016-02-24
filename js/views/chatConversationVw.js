var Backbone = require('backbone'),
  $ = require('jquery'),
  moment = require('moment'),
  app = require('../App.js').getApp(),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  ChatMessageVw = require('./chatMessageVw');

module.exports = baseVw.extend({
  className: 'chatConversation',

  events: {
    'click .js-closeConversation': 'onClickClose',
    'keydown textarea': 'onKeydownMessage',
    'keyup textarea': 'onKeyupMessage',
    'click .js-conversationSettings': 'toggleConvoSettings',
    'click .chatConversationMenu': 'closeConvoSettings',
    'click .js-blockUser': 'onBlockClick'
  },

  initialize: function(options) {
    this.options = options || {};

    if (!options.model) {
      throw new Error('Please provide a model of the person you are conversing with.');
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
      },
      reset: true
    });

    this.listenTo(this.collection, 'reset', () => {
      this.renderMessages();
    });

    this.listenTo(this.collection, 'request', () => {
      this.$messagesContainer.empty();
      this.$loadingSpinner.removeClass('hide');
    });

    this.listenTo(this.collection, 'add', (md) => {
      var el = this.$messagesScrollContainer[0],
          scolledToBot = el.scrollTop >= (el.scrollHeight - el.offsetHeight) - 5;

      this.$msgWrap.append(
        this.createMsg(md).render().el
      );

      if (scolledToBot) {
        el.scrollTop = el.scrollHeight;
      };
    });
  },

  onClickClose: function() {
    this.trigger('close-click');
  },

  onKeydownMessage: function(e) {
    var code = e.keyCode || e.which,
        val = this.$msgTextArea.val();
    
    if (code === 13 && !val.trim() && !this.shiftDown) {
      e.preventDefault();
    }

    if (code === 16) {
      this.shiftDown = true;
    }
  },

  onKeyupMessage: function(e) {
    var code = e.keyCode || e.which,
        val = this.$msgTextArea.val();
    
    if (code === 13 && val.trim() && !this.shiftDown) {
      this.trigger('enter-message', val);
    }

    if (code === 16) this.shiftDown = false;
  },

  getMessageField: function() {
    return this.$msgTextArea;
  },

  createMsg: function(md) {
    var vw = new ChatMessageVw({
      model: md,
      user: this.user
    });

    this.msgViews.push(vw);
    this.registerChild(vw);

    return vw;
  },

  closeConvoSettings: function() {
    this.$('.chatConversationMenu').addClass('hide');
  },

  toggleConvoSettings: function() {
    this.$('.chatConversationMenu').toggleClass('hide');
  },

  onBlockClick: function() {
    this.user.blockUser(this.model.get('guid'));
  },

  renderMessages: function() {
    this.$msgWrap = $('<div />');

    this.$loadingSpinner.addClass('hide');

    if (this.msgViews) {
      this.msgViews.forEach((vw, index) => {
        vw.remove();
      });
    }

    this.msgViews = [];

    this.collection.forEach((md, index) => {
      this.$msgWrap.append(
        this.createMsg(md).render().el
      );
    });

    this.$messagesContainer.html(this.$msgWrap);
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