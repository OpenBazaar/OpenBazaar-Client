'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'loadingModal modalCoverFullscreen',

  events: {
  },

  onClickIndexReload: function() {
    window.location.reload();
  },

  open: function() {
    window.clearTimeout(this.longLoadButtonsTimeout);
    this.longLoadButtonsTimeout = window.setTimeout(() => {
      this.$longLoadButtons.addClass('fadeIn');
    }, 5000);

    return baseModal.prototype.open.apply(this, arguments);
  },  

  close: function() {
    window.clearTimeout(this.longLoadButtonsTimeout);
    this.$longLoadButtons.removeClass('fadeIn');

    return baseModal.prototype.close.apply(this, arguments);
  },

  render: function() {
    loadTemplate('./js/templates/pageConnectModal.html', (t) => {
      this.$el.html(t(this._state));

      baseModal.prototype.render.apply(this, arguments);

      this.$statusText = this.$('.statusText');
    });

    return this;
  },

  render: function() {
    loadTemplate('./js/templates/loadingModal.html', (t) => {
      this.$el.html(t());

      baseModal.prototype.render.apply(this, arguments);

      this.$longLoadButtons = this.$('.loadingModalContent');
    });

    return this;
  }
});
