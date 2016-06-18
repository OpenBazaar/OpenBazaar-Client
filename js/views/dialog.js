'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal'),
    Dialog;

/*
Used to show a dialog with optional buttons. By default, the dialog removes itself on close. In it's
simplest form a dialog can be launched as follows:

var myDialog = new Dialog({
  title: 'Houston, We Have A problem!',
  message: 'How can you eat your pudding, if you haven't eaten your meat!?'
}).render().open();

Additionally, you could specify an array of buttons which will be displayed at the bottom of the
dialog. The buttons should be provided in the following format:

{
  title: '...',
  ...
  buttons: [{
    text: 'Cancel', // displayed text of button
    fragment: 'cancel' // unique fragment to identify the button. Used internally, as well as
                       // used to determine the event that will be fire upon click of the button,
                       // e.g. the above fragment would result in 'click-cancel'.
  },{
    text: 'Ok',
    fragment: 'ok'
  }]
}

Please Note: This Dialog is designed for simple messages with optional classes or buttons on the bottom. If
you find that your situation needs custom markup, css (beyond the classes you can optionally pass in),
and/or behavior (e.g. tabs, etc.), you should write a custom view and extend from the Base Modal.

Also, if it's just a super simple message you need, please use the simpleMessageModal instance attached to
our app instance.
*/

Dialog = baseModal.extend({
  className: 'messageModal',

  events: {
  },

  constructor: function(options) {
    var events = {};

    options = __.extend({
      innerWrapperClass: 'modal-child modal-childMain color-primary custCol-primary custCol-text padding20'
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
  },

  onBtnClick: function(e) {
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

module.exports = Dialog;