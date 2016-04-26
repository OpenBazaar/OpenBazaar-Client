'use strict';

var Backbone = require('backbone'),
    __ = require('underscore'),
    domUtils = require('../utils/dom'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({
    constructor: function (options) {
      var events = {},
          defaults;

      defaults = {
        dismissOnOverlayClick: false,
        showCloseButton: false,
        closeButtonClass: 'btn-corner btn-cornerTR',
        innerWrapperClass: 'modal-child modal-childMain custCol-primary'
      };

      this.__options = __.extend({}, defaults, options || {});
      this.className = 'modal modal-opaque ' + __.result(this, 'className', '');
      this._open = false;

      events['click'] = '__modalClick';
      events['click .js-modal-close'] = '__closeClick';
      this.events = __.extend({}, events, this.events || {});

      baseVw.prototype.constructor.apply(this, arguments);
    },

    __modalClick: function(e) {
      if (e.target === this.el) {
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
        document.body.appendChild(this.el);

        this._open = true;
        this.trigger('open');
        window.obEventBus.trigger('modal-open', { modal: this });
      }

      return this;
    },

    close: function() {
      if (domUtils.isInPage(this.el)) {
        document.body.removeChild(this.el);

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

      // TODO: allow other options to be modifiable via this method.
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
          t( __.extend({} , self.__options, { innerContent: self.el.innerHTML}) )
        );
      });

      this.$modalClose = this.$('.js-modal-close');

      return this;
    }
});
