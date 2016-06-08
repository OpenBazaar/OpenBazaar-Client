'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'loadingModal modalCoverFullscreen',

  events: {
    'click .js-indexReload': 'onClickIndexReload'
  },

  onClickIndexReload: function() {
    if (app.router) {
      app.router.refresh();
    } else {
      window.location.reload();
    }
  },

  open: function() {
    window.clearTimeout(this.longLoadTimeout);
    this.longLoadTimeout = window.setTimeout(() => {
      this.$loadingModalContent.addClass('fadeIn');
    }, 5000);

    return baseModal.prototype.open.apply(this, arguments);
  },  

  close: function() {
    window.clearTimeout(this.longLoadTimeout);
    this.$loadingModalContent.removeClass('fadeIn');

    return baseModal.prototype.close.apply(this, arguments);
  },

  render: function() {
    loadTemplate('./js/templates/loadingModal.html', (t) => {
      this.$el.html(t());

      baseModal.prototype.render.apply(this, arguments);

      this.$loadingModalContent = this.$('.loadingModalContent');
    });

    return this;
  }
});
