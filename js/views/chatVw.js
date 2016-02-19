var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  ChatConversationsCl = require('../collections/chatConversationCl'),
  baseVw = require('./baseVw'),
  ChatHeadsVw = require('./chatHeadsVw'),
  ChatConversationVw = require('./chatConversationVw');

module.exports = baseVw.extend({
  events: {
    'click .js-chatOpen': 'slideOut',
    'click .js-closeChat': 'close',
  },

  initialize: function(options) {
    var options = options || {};

    this.socketView = options.socketView;

    // cache some selectors which are outside of
    // our el's scope
    this.$sideBar = $('#sideBar');
    this.$container = $('.container');
    this.$obContainer = $('#obContainer');
    this.$loadingSpinner = $('.spinner-with-logo');

    this.chatConversationsCl = new ChatConversationsCl();
    this.chatConversationsCl.fetch();

    this.listenTo(this.chatConversationsCl, 'sync', (cl) => {
      if (cl.length) {
        for (var i=0; i < 100; i++) {
          cl.add(
            cl.at(0).clone().set('guid', Math.random().toString())
          );
        }
      }

      if (!this.chatHeadsVw) {
        this.chatHeadsVw = new ChatHeadsVw({
          collection: cl
        });

        this.$chatHeadsContainer.html(
          this.chatHeadsVw.render().el
        );

        this.listenTo(this.chatHeadsVw, 'chatHeadClick', this.onChatHeadClick)

        this.registerChild(this.chatHeadsVw);
      } else {
        this.chatHeadsVw.render();
      }
    });
  },

  onChatHeadClick: function(vw) {
    this.slideOut();

    // todo: check if already exists and remove, etc...

    this.chatConversationVw = new ChatConversationVw({
      model: vw.model,
      
    });

    this.registerChild(this.chatConversationVw);

    this.listenTo(this.chatConversationVw, 'close-click', this.closeConversation);

    this.$('.js-chatConversationContainer').html(
      this.chatConversationVw.render().el
    );
  },

  closeConversation: function() {
    // this.$('.chatConversation').addClass('chatConversationHidden');
    // this.$('.chatConversationHeads').removeClass('chatConversationHeadsCompressed').removeClass('textOpacity50');
    // this.$('.chatHead').removeClass('chatHeadSelected');
    // this.$('.chatSearch').removeClass('textOpacity50');
    this.chatConversationVw && this.chatConversationVw.remove();
  },

  openChat: function(guid, key) {
    var self = this,
        model = this.options.model,
        avatarURL = "",
        avatarHash = window.localStorage.getItem("avatar_" + guid);

    if (this.currentChatId === guid) {
      this.openConversation();
      return;
    }

    this.currentChatId = guid;

    if (avatarHash !== '') {
      avatarURL = model.get('serverUrl') + "get_image?hash=" + avatarHash + "&guid=" + guid;
    }

    this.openConversation();

    $('.chatConversationAvatar').css('background-image', 'url(' + avatarURL + '), url(imgs/defaultUser.png)');
    $('.chatConversationLabel').html(guid);
    this.conversationKey = key;
    $('#inputConversationMessage').focus();

    this.updateChat(guid);
    this.closeConversationSettings();

    $('.chatHead').removeClass('chatHeadSelected');
    $('#chatHead_' + guid).parent().addClass('chatHeadSelected');

    // Mark as read
    $.post(self.serverUrl + "mark_chat_message_as_read", {guid: guid});
    $('#chatHead_' + guid).attr('data-count', 0);
    $('#chatHead_' + guid).removeClass('badge');
    $('#chatHead_' + guid).addClass('chatRead');

  },

  openConversation: function() {
    this.slideOut();
    this.$('.chatConversation').removeClass('chatConversationHidden');
    this.$('.chatConversationHeads').addClass('chatConversationHeadsCompressed textOpacity50');
    this.$('.chatSearch').addClass('textOpacity50');
  },    

  slideOut: function() {
    this.$sideBar.addClass('sideBarSlid');
    this.$container.addClass('compressed');
    this.$loadingSpinner.addClass('modalCompressed');
    this.$obContainer.addClass('noScrollBar');
    $('#colorbox').addClass('marginLeftNeg115');
    self.$('.chatSearch').addClass('chatSearchOut');
    self.$('.btn-chatOpen')
        .addClass('hide')
        .find('span')
        .removeClass('hide');
    // self.$('.chatMessagesLabel').removeClass('hide');
  },

  slideIn: function() {
    this.$sideBar.removeClass('sideBarSlid');
    this.$container.removeClass('compressed');
    this.$loadingSpinner.removeClass('modalCompressed');
    this.$obContainer.removeClass('noScrollBar');
    $('#colorbox').removeClass('marginLeftNeg115');
    self.$('.chatSearch').removeClass('chatSearchOut');
  },

  close: function(){
    this.slideIn();
    this.$('.btn-chatOpen')
        .removeClass('hide')
        .find('span')
        .addClass('hide');

    // $('.chatHeadSelected').removeClass('chatHeadSelected');
    // this.closeConversation();
  },      

  render: function() {
    loadTemplate('./js/templates/chat.html', (tmpl) => {
      this.$el.html(tmpl());

      this.$chatHeadsContainer = this.$('.chatConversationHeads');
    });

    return this;
  },

  remove: function() {
    baseVw.prototype.remove.apply(this, arguments);
  }
});