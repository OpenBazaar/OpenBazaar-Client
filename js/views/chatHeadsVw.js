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

  render: function() {
    this.$headContainer = $('<div />');

    if (this.chatHeadViews) {
      this.chatHeadViews.forEach((vw) => {
        vw.remove();
      });
    }

    this.chatHeadViews = [];

    this.collection.forEach((md, index) => {
      this.$headContainer.append(
        this.createChatHead(md).render().el
      );
    });

    this.$el.html(this.$headContainer);

    return this;
  }
});