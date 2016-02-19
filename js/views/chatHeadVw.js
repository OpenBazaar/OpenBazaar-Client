var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'border0 custCol-border-secondary flexRow marginLeft1 marginTop1',

  events: {
    'click': 'chatHeadClick'
  },

  initialize: function(options) {
    if (!options.model) {
      throw new Error('Please provide a model.');
    }
  },

  chatHeadClick: function() {
    this.trigger('click', this);
  },

  render: function() {
    loadTemplate('./js/templates/chatHead.html', (tmpl) => {
      this.$el.html(
        tmpl(this.model.toJSON())
      );
    });

    return this;
  }
});