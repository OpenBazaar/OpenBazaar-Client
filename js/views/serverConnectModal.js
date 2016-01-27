'use strict';

var Backbone = require('backbone'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'connect-yo-self',

  events: {
    'click button': 'buttonClick'
  },

  initialize: function(options) {

  },

  buttonClick: function() {
    alert('how dare you click me?');
  },

  render: function() {
    this.$el.html('<p class="sassy">charlie chuckles cried morose.</p><button>Move on over!</button>')

    baseModal.prototype.render.apply(this, arguments);

    return this;
  }
});
