var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw'),
  chatHeadVw = require('./chatHeadVw');

module.exports = baseVw.extend({
  // className: 'border0 custCol-border-secondary flexRow marginLeft1 marginTop1',

  events: {
  },

  initialize: function(options) {
    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }
  },

  chatHeadClick: function(vw) {
    this.trigger('chatHeadClick', vw);
  },

  render: function() {
    var $container = $('<div />');

    if (this.chatHeadViews) {
      this.chatHeadViews.forEach((vw) => {
        vw.remove();
      });
    }

    this.chatHeadViews = [];

    this.collection.forEach((md, index) => {
      var vw = new chatHeadVw({
        model: md
      });

      this.chatHeadViews.push(vw);
      $container.append(vw.render().el);
      this.listenTo(vw, 'click', this.chatHeadClick);
      this.registerChild(vw);
    });

    this.$el.html($container);

    return this;
  }
});