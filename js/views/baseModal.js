'use strict';

var __ = require('underscore'),
    domUtils = require('../utils/dom'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw'),
    baseModal;

baseModal = baseVw.extend({
  constructor: function (options) {
    var events = {},
        args = Array.prototype.slice.call(arguments),
        defaults;

    defaults = {
      dismissOnOverlayClick: true,
      dismissOnEscPress: true,
      showCloseButton: true,
      closeButtonClass: 'btn-corner btn-cornerTR btn-cornerTROutR btn-flushTop',
      // This will be concatenated to the className of your view which extends
      // baseModal. You really shouldn't have to use this option, unless you
      // don't want 'modal-opaque' (i.e. remove 'modal' at your own risk!)
      baseModalClass: 'modal modal-opaque',
      innerWrapperClass: 'modal-child modal-childMain custCol-primary custCol-text'
    };

    options = __.extend({}, defaults, options || {});
    options.className = options.baseModalClass + ' ' + __.result(this, 'className', '') +
        (' ' + (options.className || ''));
    args[0] = options;
    this.__options = options;
    this._open = false;

    __.bindAll(this, '__onDocKeypress');

    events['click'] = '__modalClick';
    events['click .js-modal-close'] = '__closeClick';
    this.events = __.extend({}, events, this.events || {});

    if (typeof baseModal.__openModals === 'undefined') {
      baseModal.__openModals = [];
    }    

    this.$html = baseModal.$html = baseModal.$html || $('html');
    this.$container = baseModal.$container = baseModal.$container || $('#contentFrame');

    if (!baseModal.__docKeyPressHandlerBound) {
      $(document).on('keyup', baseModal.__onDocKeypress);
      baseModal.__docKeyPressHandlerBound = true;
    }

    baseVw.prototype.constructor.apply(this, args);
  },

  __onDocKeypress: function(e) {
    var topModal = this.__getTopModal();

    if (this.__options.dismissOnEscPress && e.keyCode === 27 &&
      topModal && topModal === this) {
      this.close();
    }
  },

  __modalClick: function(e) {
    if (this.__options.dismissOnOverlayClick && e.target === this.el) {
      this.close();
    }
  },

  __closeClick: function() {
    this.close();
  },

  __getTopModal: function() {
    var openModals = baseModal.__openModals.slice();

    openModals = openModals.map((modal, i) => {
      return { modal: modal, index: i };
    });

    openModals = openModals.sort((a, b) => {
      var aZindex = parseInt(window.getComputedStyle(a.modal.el).zIndex) || 0,
          bZindex = parseInt(window.getComputedStyle(b.modal.el).zIndex) || 0;

      if (aZindex === bZindex) {
        return (a.index < b.index) ? -1 : (a.index > b.index) ? 1 : 0;
      }
      return (aZindex < bZindex) ? -1 : (aZindex > bZindex) ? 1 : 0;
    });

    return openModals[openModals.length - 1] && openModals[openModals.length - 1].modal;
  },

  isOpen: function() {
    return this._open;
  },

  open: function() {
    if (!domUtils.isInPage(this.el)) {
      this.$html.addClass('modalOpen');
      this.$container.append(this.el);
      baseModal.__openModals.push(this);
      baseModal.__topModal = this.__getTopModal();
      this._open = true;
      this.trigger('open');
      window.obEventBus.trigger('modal-open', { modal: this });
    }

    return this;
  },

  close: function() {
    var modalIndex;

    if (domUtils.isInPage(this.el)) {
      modalIndex = baseModal.__openModals.indexOf(this);
      modalIndex >= 0 && baseModal.__openModals.splice(modalIndex, 1);
      !baseModal.__openModals.length && this.$html.removeClass('modalOpen');
      baseModal.__topModal = this.__getTopModal();
      this.$container[0].removeChild(this.el);
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
    this.isOpen() && this.close();
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

baseModal.__onDocKeypress = function(e) {
  var topModal;

  if (e.keyCode === 27 && (topModal = baseModal.__topModal) &&
      topModal.__options.dismissOnEscPress) {
    topModal.close();
  }
};

module.exports = baseModal;