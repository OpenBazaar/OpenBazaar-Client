var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  app = require('../App').getApp(),
  baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'statusMessageWrap',

  initialize: function(options) {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    loadTemplate('./js/templates/statusMessage.html', (tmpl) => {
      this.$el.html(
        tmpl(this.model.toJSON())
      );
    });

    return this;
  }
});