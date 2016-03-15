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
    'click .js-blockUser': 'onBlockClick',
    'click .js-clearConvo': 'onClearConvoClick'
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
      var clLen = cl.length;

      this.fetch = xhr;
      this.$loadingSpinner.removeClass('hide');
      
      xhr.done(() => this.$loadingSpinner.addClass('hide'));
    });        

    this.listenTo(this.collection, 'update', (cl, options) => {
      var $msgPage = $('<div />');

      // we're assuming the only additions will either be a batch of
      // models at the top (lazy loaded via scroll) -or- one new
      // model at the bottom (new notification via socket) 
      cl.forEach((md, index) => {
        if (!md.viewCreated) {
          if (cl.indexOf(md) === cl.length - 1) {
            // new message via socket
            this.addMessagesToDom(
              this.createMsg(md).render().el
            );            
          } else {
            // new page of messages
            $msgPage.append(this.createMsg(md).render().el);
          }
        }
      });

      if ($msgPage.children().length) {
        this.addMessagesToDom($msgPage, true);
      }
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
          // backend is hard-coding limit at 20 for now (SQLite issue)
          limit: typeof this.options.messagesPerFetch === 'undefined' ? this.MESSAGES_PER_FETCH : this.options.messagesPerFetch
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

  onClearConvoClick: function() {
    var formData = new FormData();

    formData.append('guid', this.model.get('guid'));

    $.ajax({
      url: app.serverConfig.getServerBaseUrl() + '/chat_conversation?guid=' + this.model.get('guid'),
      type: 'DELETE'
    });

    this.collection.reset();
    this.trigger('clear-conversation');
  },

  createMsg: function(md) {
    var vw = new ChatMessageVw({
      model: md,
      user: this.user
    });

    md.viewCreated = true;
    this.msgViews.push(vw);
    this.registerChild(vw);

    return vw;
  },

  addMessagesToDom: function($messages, prepend, scrollTop) {
    var prevScroll = {},
        $scroll = this.$messagesScrollContainer;

    prevScroll.height = $scroll[0].scrollHeight;
    prevScroll.top = $scroll[0].scrollTop;

    console.log('scream: ' + JSON.stringify(prevScroll));

    if (!prepend) {
      this.$messagesContainer.append($messages);

      if (__.isNumber(scrollTop)) {
        console.log('charlie');
        $scroll[0].scrollTop = scrollTop;  
      } else if (prevScroll.top >= prevScroll.height - $scroll[0].clientHeight - 10) {
        console.log('resetting to bot');
        $scroll[0].scrollTop = $scroll[0].scrollHeight;
      }
    } else {
      this.$messagesContainer.prepend($messages);
      $scroll[0].scrollTop = prevScroll.top + ($scroll[0].scrollHeight - prevScroll.height);
    }
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

        setTimeout(() => {
          this.addMessagesToDom($msgWrap, null,
            __.isNumber(this.options.initialScroll) ? this.options.initialScroll : 9999);
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