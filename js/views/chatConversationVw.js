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

  MESSAGES_PER_FETCH: 5,

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
    this.fetch = this.options.initialFetch;

    this.listenTo(this.collection, 'reset', this.render);

    this.listenTo(this.collection, 'request', (cl, xhr, options) => {
      this.fetch = xhr;
      this.$loadingSpinner.removeClass('hide');
      xhr.done(() => this.$loadingSpinner.addClass('hide'));
    });        

    this.listenTo(this.collection, 'add', (md) => {
      var el = this.$messagesScrollContainer[0],
          scolledToBot = el.scrollTop >= (el.scrollHeight - el.offsetHeight) - 5;

      this.$messagesContainer.append(
        this.createMsg(md).render().el
      );

      if (scolledToBot) {
        el.scrollTop = el.scrollHeight;
      };
    });

    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );    
  },

  onScroll: function(e) {
    var startId;

    if (!this.collection.length) return;

    startId = this.collection.at(0).id;

    if (
        !this.fetchedAll &&
        !(this.fetch && this.fetch.state() === 'pending') &&
        this.$messagesScrollContainer[0].scrollTop === 0
      ) {
      this.collection.fetch({
        remove: false,
        data: {
          guid: this.model.get('guid'),
          start: startId,
          limit: (typeof this.options.messagesPerFetch === 'undefined' ? this.MESSAGES_PER_FETCH : this.options.messagesPerFetch) + 1
        }
      }).done(() => {
        if (this.collection.at(0).id === startId) {
          this.fetchedAll = true;
        }
      });
    }    
  },

  onClickClose: function() {
    this.trigger('close-click');
  },

  onKeydownMessage: function(e) {
    var code = e.keyCode || e.which;
    
    if (code === 13 && !this.shiftDown) {
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

  getScrollContainer: function() {
    return this.$messagesScrollContainer[0];
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

  createMsg: function(md) {
    var vw = new ChatMessageVw({
      model: md,
      user: this.user
    });

    this.msgViews.push(vw);
    this.registerChild(vw);

    return vw;
  },  

  render: function() {
    loadTemplate('./js/templates/chatConversation.html', (tmpl) => {
      var $msgWrap = $('<div />');

      if (this.msgViews) {
        this.msgViews.forEach((vw, index) => {
          vw.remove();
        });
      }

      this.msgViews = [];

      this.$el.html(
        tmpl(__.extend(this.model.toJSON(), {
          isFetching: this.fetch && this.fetch.state() === 'pending',
          messages: this.collection.toJSON()
        }))
      );

      this.$('.chatConversationMessage textarea').focus()
      this.$messagesScrollContainer = this.$('.chatConversationContent');
      this.$messagesScrollContainer.on('scroll', this.scrollHandler);
      this.$loadingSpinner = this.$messagesScrollContainer.find('.js-loadingSpinner');
      this.$messagesContainer = this.$messagesScrollContainer.find('.js-messagesContainer');
      this.$msgTextArea = this.$('textarea');

      if (this.collection.length) {
        this.collection.forEach((md) => {
          $msgWrap.append(
            this.createMsg(md).render().el
          );
        });

        this.$messagesContainer.html($msgWrap);

        setTimeout(() => {
          this.$messagesScrollContainer[0].scrollTop = __.isNumber(this.options.initialScroll) ?
            this.options.initialScroll : this.$messagesScrollContainer[0].scrollHeight;
        }, 0);          
      }
    });

    return this;
  },

  remove: function() {
    this.$scrollContainer && this.$scrollContainer.off('scroll', this.scrollHandler);

    baseVw.prototype.remove.apply(this, arguments);    
  }  
});