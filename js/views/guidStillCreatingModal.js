'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'guid-still-creating-modal',

  events: {
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/guidStillCreatingModal.html', function(t) {
      self.$el.html(t());

      baseModal.prototype.render.apply(self, arguments);
    });

    return this;
  }
});
