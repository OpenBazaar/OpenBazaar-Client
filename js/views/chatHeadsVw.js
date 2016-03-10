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

    if (!options.parentEl) {
      throw new Error('Please provide a parent element');
    }

    this.listenTo(this.collection, 'add', (md, cl, opts) => {
      this.$headContainer.prepend(
        this.createChatHead(md).render().el
      );
    });

    this.$chatHeadsContainer = options.parentEl;
    this.$headContainer = $('<div />');

    this.showPerScroll = 12;
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
    this.checkIfFilled();

    return this;
  },

  checkIfFilled: function(){
    //check to see if parent is filled. If not, call onScroll a second time.
    //use a zero second timeout to force the check to be after render is complete
    setTimeout(() => {
      if(this.$headContainer[0].childNodes.length < this.collection.length && this.$chatHeadsContainer[0].clientHeight > this.$headContainer[0].scrollHeight){
        this.onScroll();
        this.checkIfFilled();
      }
    },0);
  },

  renderChatHeads: function(start, end) {
    var chatsToRender =  __.filter(this.collection.models, function(value, index){
                          return (index >= start) && (index < end);
                        });

    chatsToRender.forEach((md, index) => {
      this.$headContainer.append(
        this.createChatHead(md).render().el
      );
    });


    this.nextChatToShow = this.nextChatToShow >= this.collection.length ? this.nextChatToShow : this.nextChatToShow + this.showPerScroll;
  },

  remove: function(){
    this.scrollHandler && this.$headContainer.off('scroll', this.scrollHandler);
  }

});