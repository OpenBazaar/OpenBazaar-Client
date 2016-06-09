'use strict';

var loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

module.exports = baseModal.extend({
  className: 'messageModal',

  events: {
  },

  constructor: function(options) {
    var events = {};

    options = __.extend({
      innerWrapperClass: 'modal-child modal-childMain color-primary custCol-primary padding20'
    }, options || {});

    if (options.buttons && options.buttons.length) {
      options.buttons.forEach((btn) => {
        var serializedBut = JSON.stringify(btn);

        if (!btn.text || !btn.fragment) {
          throw new Error(`The button, '${serializedBut.slice(0, 10)}',` +
            ` is missing either a text or fragment property. Both are required.`);
        }

        events['click .js-' + btn.fragment] = 'onBtnClick';
      });

      this.events = __.extend({}, events, this.events || {});
    }

    baseModal.prototype.constructor.apply(this, [options].concat(Array.prototype.slice.call(arguments, 1)));
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
    console.log('triggerin ' + 'click-' + $(e.target).data('event-name'));
    this.trigger('click-' + $(e.target).data('event-name'));
  },

  render: function() {
    loadTemplate('./js/templates/dialog.html', (t) => {
      this.$el.html(t(this.options));

      baseModal.prototype.render.apply(this, arguments);
    });

    return this;
  }
});
