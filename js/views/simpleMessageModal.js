'use strict';

var __ = require('underscore'),
    loadTemplate = require('../utils/loadTemplate'),
    baseModal = require('./baseModal');

/*
  An instance of this modal is attached to our App instance, which allows you to display a simple message
  as follows:

  var app = require('../App.js').getApp(); // adjust path as needed

  app.simpleMessageModal.open({
    title: 'The Beatles',
    message: 'We all need a little help from our friends.'
  });

  Please Note: This Modal is designed for a very simple message (containing a title and a message body).
  If you need something beyond that, check out the Dialog which will allow you to optionally pass in
  classes as well as buttons. If you need something beyond that, please create a custom modal extending
  from the baseModal.
*/

module.exports = baseModal.extend({
  className: 'messageModal',

  events: {
  },

  constructor: function(options) {
    options = __.extend({
      innerWrapperClass: 'modal-child modal-childMain color-primary custCol-primary custCol-text padding20'
    }, options || {});

    baseModal.prototype.constructor.apply(this, [options].concat(Array.prototype.slice.call(arguments, 1)));
  },

  initialize: function(options) {
    this.options = __.extend({
      removeOnClose: true,
      title: '',
      message: ''
    }, options || {});

    this.options.removeOnClose && this.on('close', () => this.remove());
    this.title = options.title;
    this.message = options.message;
  },

  open: function(content) {
    if (!content.title && !content.message) {
      throw new Error('Please provide a title and / or message.');
    }

    if (content.title !== this.title || content.message !== this.message) {
      this.title = content.title || '';
      this.message = content.message || '';
      this.render();
    }

    baseModal.prototype.open.apply(this);
  },

  render: function() {
    loadTemplate('./js/templates/simpleMessageModal.html', (t) => {
      this.$el.html(t({
        title: this.title,
        message: this.message
      }));

      baseModal.prototype.render.apply(this, arguments);
    });

    return this;
  }
});