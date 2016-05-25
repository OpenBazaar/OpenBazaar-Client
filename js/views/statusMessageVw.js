'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  className: 'statusMessageWrap',

  initialize: function() {
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