var Backbone = require('backbone'),
  $ = require('jquery'),
  loadTemplate = require('../utils/loadTemplate'),
  app = require('../App').getApp(),
  StatusMessageMd = require('../models/statusMessageMd'),
  StatusMessageCl = require('../collections/statusMessagesCl'),
  baseVw = require('./baseVw'),
  StatusMessageVw = require('./statusMessageVw');

module.exports = baseVw.extend({
  initialize: function(options) {
    this.collection = new StatusMessageCl();
    this.vwRemoveTimeouts = [];
    this.mdRemoveTimeouts = [];

    this.listenTo(this.collection, 'add', this.onAddMessage);
    this.listenTo(this.collection, 'remove', this.onRemoveMessage);
  },

  onRemoveMessage: function(md, cl, opts) {
    var vw = this.msgViews.splice(opts.index, 1)[0],
        timeout;

    vw.$el.removeClass('slideUp');

    // give any animations some time to complete and then remove the view
    timeout = setTimeout(() => {
      vw.remove();
      this.vwRemoveTimeouts.splice(timeout, 1);
    }, 5000);

    this.vwRemoveTimeouts.push(timeout);
  },

  onAddMessage: function(md, cl, opts) {
    var vw = new StatusMessageVw({ model: md }),
        duration = md.get('duration'),
        timeout;

    this.msgViews = this.msgViews || [];
    this.$el.prepend(vw.render().el);
    this.registerChild(vw);
    this.msgViews.push(vw);

    setTimeout(() => {
      vw.$el.addClass('slideUp');
    }, 100);

    if (duration) {
      timeout  = setTimeout(() => {
        cl.remove(md);
        this.mdRemoveTimeouts.splice(timeout, 1);
      }, duration);

      this.mdRemoveTimeouts.push(timeout);
    }
  },

  // Pass in a msg as a string or a message object. As object,
  // the following options are available:
  //
  // msg:      message text (required)
  // type:     'msg', 'warning', 'confirmed'  (optional)
  // duration: The length of time before status msg is removed. Pass in false if
  //           you would like to remove it yourself. This method will return an object
  //           with a remove() method that can be called at your leisure. (optional)
  //
  pushMessage: function(msg) {
    var md = new StatusMessageMd(),
        updateMessage,
        errs;

    if (typeof msg === 'string') msg = { msg: msg };

    if (errs = md.validate(msg)) {
      for (var err in errs) {
        throw new Error(errs[err]);
      }
    }

    md.set(msg);
    this.collection.add(md);

    updateMessage = (msg) => {
      if (!msg) {
        throw new Error('Please provide a msg.');
      }

      if (typeof msg === 'string') {
        md.set('msg', msg);
      } else {
        delete msg.duration;
        md.set(msg);
      }
    };

    return {
      remove: () => {
        this.collection.remove(md);
      },
      updateMessage: updateMessage
    }
  },

  remove: function() {
    this.vwRemoveTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });

    this.mdRemoveTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });

    baseVw.prototype.remove.apply(this, arguments);
  }
});