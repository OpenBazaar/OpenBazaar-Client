'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'overlayObscurring insideApp',

  events: {
    'click .js-showBlockedUser': 'showPage',
    'click .js-showNSFWContent': 'showPage',
  },

  constructor: function(options) {
    options = __.extend({
      dismissOnOverlayClick: false,
      dismissOnEscPress: false,
      showCloseButton: false,
      baseModalClass: 'modal',
      innerWrapperClass: 'custCol-primary custCol-text'
    }, options || {});

    baseModal.prototype.constructor.apply(this, [options].concat(Array.prototype.slice.call(arguments, 1)));
  },

  initialize: function(options) {
    this.options = __.extend({
      reason: 'blocked'
    }, options || {});
  },

  showPage: function() {
    this.trigger('showPage');
  },

  render: function() {
    loadTemplate('./js/templates/hiddenWarningModal.html', (t) => {
      this.$el.html(t({ reason: this.options.reason }));

      baseModal.prototype.render.apply(this, arguments);
    });

    return this;
  }
});
