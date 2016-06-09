'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    stringUtils = require('../utils/string'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'messageModal',

  events: {
  },

  constructor: function(options) {
    var events = {};

    options = options || {};

    if (options.buttons && options.buttons.length) {
      options.buttons.forEach((btnText) => {
        events[stringUtils.camelize(btnText)] = 'onBtnClick';
      });

      this.events = __.extend({}, events, this.events || {});
    }

    baseModal.prototype.constructor.apply(this, arguments);
  },

  initialize: function(options) {
    this.options = __.extend({
      removeOnClose: true,
      title: '',
      message: '',
      titleClass: '',
      messageClass: '',
      buttons: []
    }, options || {});

    this.options.removeOnClose && this.on('close', () => this.remove());
    this.render().open();
  },

  onBtnClick: function(e) {
    console.log('trigger ' + $(e.target).data('event-name'));
    this.trigger($(e.target).data('event-name'));
  },

  // open: function() {
  //   return baseModal.prototype.open.apply(this, arguments);
  // },  

  // close: function() {
  //   return baseModal.prototype.close.apply(this, arguments);
  // },

  render: function() {
    loadTemplate('./js/templates/dialog.html', (t) => {
      this.$el.html(t(this.options));

      baseModal.prototype.render.apply(this, arguments);

      // this.$statusText = this.$('.statusText');
    });

    return this;
  }
});
