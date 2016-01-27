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
        includeCloseButton: false,
        closeButtonClass: 'btn-corner btn-cornerTR',
        innerWrapperClass: 'modal-child modal-childMain'
      }

      this.__options = __.extend({}, defaults, options || {});
      this.className = 'modal modal-opaque ' + __.result(this, 'className', '');

      if (this.__options.dismissOnOverlayClick) {
        events['click'] = '__modalClick';
      }

      if (this.__options.includeCloseButton) {
        events['click .js-modal-close'] = '__closeClick';
      }      

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

    open: function() {
      if (!domUtils.isInPage(this.el)) {
        document.body.appendChild(this.el);

        this.trigger('open');
        window.obEventBus.trigger('modal-open', { modal: this });
      }
    },

    close: function() {
      if (domUtils.isInPage(this.el)) {
        document.body.removeChild(this.el);

        this.trigger('close');
        window.obEventBus.trigger('modal-close', { modal: this });
      }
    },

    remove: function() {
      if (domUtils.isInPage(this.el)) {
        this.trigger('close');
        window.obEventBus.trigger('modal-close', { modal: this });        
      }

      baseVw.prototype.remove.apply(this, arguments);
    },

    render: function() {
      var self = this;

      loadTemplate('./js/templates/baseModal.html', function(t) {
        self.$el.html(
          t( __.extend({} , self.__options, { innerContent: self.el.innerHTML}) )
        );
      });
    }
});
