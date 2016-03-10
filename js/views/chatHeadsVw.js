var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  chatHeadVw = require('./chatHeadVw');

module.exports = baseVw.extend({
  events: {
  },

  initialize: function(options) {
    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    this.listenTo(this.collection, 'add', (md, cl, opts) => {
      this.$headContainer.prepend(
        this.createChatHead(md).render().el
      );
    });

    this.$chatHeadsContainer = $('.chatConversationHeads');
    this.$headContainer = $('<div />');

    this.showPerScroll = 10;
    this.nextChatToShow = 0;

    //listen to scrolling on container
    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
    this.$chatHeadsContainer.on('scroll', this.scrollHandler);
  },

  setCollection: function(cl) {
    if (cl) {
      this.collection = cl;
    }
  },

  chatHeadClick: function(vw) {
    this.trigger('chatHeadClick', vw);
  },

  createChatHead: function(md) {
    var vw = new chatHeadVw({
      model: md
    });

    this.chatHeadViews.push(vw);
    this.listenTo(vw, 'click', this.chatHeadClick);
    this.registerChild(vw);

    return vw;
  },

  onScroll: function(){
    if(this.$chatHeadsContainer[0].scrollTop + this.$chatHeadsContainer[0].clientHeight + 200 > this.$chatHeadsContainer[0].scrollHeight &&
        this.$headContainer && this.$headContainer[0].hasChildNodes()) {
      this.renderChatHeads(this.nextChatToShow, this.nextChatToShow + this.showPerScroll);
    }
  },

  render: function(){
    //remove any old chatHead views
    if (this.chatHeadViews) {
      this.chatHeadViews.forEach((vw) => {
        vw.remove();
      });
    }

    this.chatHeadViews = [];
    this.renderChatHeads(this.nextChatToShow, this.showPerScroll);
    this.$el.html(this.$headContainer);

    return this;
  },

  renderChatHeads: function(start, end) {
    var totalChats = this.collection.models.length,
        chatsToRender =  __.filter(this.collection.models, function(value, index){
                          return (index >= start) && (index < end);
                        });

    chatsToRender.forEach((md, index) => {
      this.$headContainer.append(
        this.createChatHead(md).render().el
      );
    });

    this.nextChatToShow = this.nextChatToShow >= totalChats ? this.nextChatToShow : this.nextChatToShow + this.showPerScroll;
  }

});