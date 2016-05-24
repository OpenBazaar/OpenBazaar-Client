var Backbone = require('backbone'),
    __ = require('underscore'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  chatHeadVw = require('./chatHeadVw');

module.exports = baseVw.extend({

  class: 'chatHeads',

  events: {
  },

  initialize: function(options) {
    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }

    if (!options.parentEl) {
      throw new Error('Please provide a parent element');
    }

    this.setCollection(this.collection);
    this.$chatHeadsContainer = options.parentEl;
    this.showPerScroll = 12;

    //listen to scrolling on container
    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
    this.$chatHeadsContainer.on('scroll', this.scrollHandler);
  },

  setCollection: function(cl) {
    if (this.collection) {
      this.stopListening(this.collection);
    }

    if (cl) {
      this.collection = cl;
    }
  },

  chatHeadClick: function(vw) {
    this.trigger('chatHeadClick', vw);
    this.chatHeadsRemoveSelectStyle(vw);
  },

  chatHeadsRemoveSelectStyle: function(vw){
    //remove any existing selected state
    this.$('.js-chatHeadWrapper').removeClass('chatHeadSelected');
    if(vw){
      vw.$el.addClass('chatHeadSelected');
    }
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
    if (this.$chatHeadsContainer[0].scrollTop + this.$chatHeadsContainer[0].clientHeight + 200 >
          this.$chatHeadsContainer[0].scrollHeight &&
        this.chatHeadViews.length < this.collection.length) {
      this.renderChatHeads(this.chatHeadViews.length, this.chatHeadViews.length + this.showPerScroll);
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
    this.$headContainer = $('<div />');
    this.renderChatHeads(0, this.showPerScroll);
    this.$el.html(this.$headContainer);
    
    setTimeout(() => {
      this.checkIfFilled();
    },0);

    return this;
  },

  checkIfFilled: function(){
    if (this.$headContainer[0].childNodes && this.$headContainer[0].childNodes.length < this.collection.length && this.$chatHeadsContainer[0].clientHeight > this.$headContainer[0].scrollHeight){
      this.onScroll();
      this.checkIfFilled();
    }
  },

  renderChatHeads: function(start, end) {
    var chatsToRender = this.collection.slice(start, end);

    chatsToRender.forEach((md, index) => {
      this.$headContainer.append(
        this.createChatHead(md).render().el
      );
    });
  },

  remove: function(){
    this.scrollHandler && this.$headContainer.off('scroll', this.scrollHandler);

    baseVw.prototype.remove.apply(this, arguments);
  }

});