'use strict';

var __ = require('underscore'),
    domUtils = require('../utils/dom'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
  constructor: function (options) {
    var events = {},
        args = Array.prototype.slice.call(arguments),
        defaults;

    defaults = {
      dismissOnOverlayClick: false,
      showCloseButton: false,
      closeButtonClass: 'btn-corner btn-cornerTR',
      innerWrapperClass: 'modal-child modal-childMain custCol-primary'
    };

    options = options || {};
    options.className = 'modal modal-opaque ' + __.result(this, 'className', '') +
        (' ' + (options.className || ''));
    args[0] = options;
    this.__options = __.extend({}, defaults, options);
    this._open = false;

    events['click'] = '__modalClick';
    events['click .js-modal-close'] = '__closeClick';
    this.events = __.extend({}, events, this.events || {});

    if (typeof this.constructor.__modalsOpen === 'undefined') {
      this.constructor.__modalsOpen = 0;
    }

    this.$html = this.constructor.$html = this.constructor.$html || $('html');
    this.$container = this.constructor.$container = this.constructor.$container || $('#contentFrame');

    baseVw.prototype.constructor.apply(this, args);
  },

  __modalClick: function(e) {
    if (this.__options.dismissOnOverlayClick && e.target === this.el) {
      this.close();
    }
  },

  __closeClick: function() {
    this.close();
  },

  isOpen: function() {
    return this._open;
  },

  open: function() {
    if (!domUtils.isInPage(this.el)) {
      this.$html.addClass('modalOpen');
      this.$container.append(this.el);
      this.constructor.__modalsOpen += 1;
      this._open = true;
      this.trigger('open');
      window.obEventBus.trigger('modal-open', { modal: this });
    }

    return this;
  },

  close: function() {
    if (domUtils.isInPage(this.el)) {
      this.constructor.__modalsOpen -= 1;
      !this.constructor.__modalsOpen && this.$html.removeClass('modalOpen');
      this.$el.remove();
      this._open = false;
      this.trigger('close');
      window.obEventBus.trigger('modal-close', { modal: this });
    }

    return this;
  },

  setModalOptions: function(options) {
    if (!options) return;

    __.extend(this.__options, options);

    if (typeof options.showCloseButton !== 'undefined') {
      this.$modalClose[options.showCloseButton ? 'removeClass' : 'addClass']('hide');
    }

    return this;
  },

  getModalOptions: function() {
    return this.__options;
  },

  remove: function() {
    this.close();
    baseVw.prototype.remove.apply(this, arguments);

    return this;
  },

  render: function() {
    var self = this;

    loadTemplate('./js/templates/baseModal.html', function(t) {
      self.$el.html(
          t( __.extend({}, self.__options, { innerContent: self.el.innerHTML}) )
        );
    });

    this.$modalClose = this.$('.js-modal-close');

    return this;
  }
});
