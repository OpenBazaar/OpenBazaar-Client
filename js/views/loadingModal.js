'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'loadingModal modalCoverFullscreen',

  events: {
    'click .js-indexReload': 'onClickIndexReload'
  },

  initialize: function(options) {
    this.options = __.extend({
      showLoadIndexButton: true
    }, options || {});
  },

  showLoadIndexButton: function() {
    this.options.showLoadIndexButton = true;
    this.render();
  },

  hideLoadIndexButton: function() {
    this.options.showLoadIndexButton = false;
    this.render();
  },  

  onClickIndexReload: function() {
    window.location.reload();
  },

  open: function(options) {
    options = __.extend({
      insideApp: false
    }, options || {});

    window.clearTimeout(this.longLoadTimeout);
    this.longLoadTimeout = window.setTimeout(() => {
      this.$loadingModalContent.addClass('fadeIn');
    }, 5000);

    this.$el[options.insideApp ? 'addClass' : 'removeClass']('insideApp');

    return baseModal.prototype.open.apply(this, arguments);
  },  

  close: function() {
    window.clearTimeout(this.longLoadTimeout);
    this.$loadingModalContent.removeClass('fadeIn');

    return baseModal.prototype.close.apply(this, arguments);
  },

  render: function() {
    loadTemplate('./js/templates/loadingModal.html', (t) => {
      this.$el.html(t(this.options));

      baseModal.prototype.render.apply(this, arguments);

      this.$loadingModalContent = this.$('.loadingModalContent');
    });

    return this;
  }
});
