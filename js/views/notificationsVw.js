var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw'),
    NotificationVw = require('../views/notificationVw');

module.exports = baseVw.extend({
  events: {
  },

  initialize: function(options) {
    var options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }    

    if (!options.socketView) {
      throw new Error('Please provide a socketView instance.');
    }    

    this.options = options;
    this.socketView = options.socketView;
    this.listenTo(this.collection, 'update', this.render);

    if (this.options.fetch) {
      this.options.fetch.done(() => {
        this.render()
      });
    }
  },

  notificationClick: function(e) {
    this.trigger('notification-click', e);
  },

  resetScroll: function() {
    if (this.$jsNotifWrap) this.$jsNotifWrap[0].scrollTop = 0;
  },

  render: function() {
    var prevScroll = {},
        isFetching = this.options.fetch && this.options.fetch.state() === 'pending';

    if (!isFetching && this.$jsNotifWrap.length) {
      if (this.$el.is(':visible')) {
        prevScroll.height = this.$jsNotifWrap[0].scrollHeight;
        prevScroll.top = this.$jsNotifWrap[0].scrollTop;
      }
    }

    this.notifications = this.notifications || [];
    this.notifications.forEach((vw) => {
      vw.remove();
    });
    this.notifications = [];

    loadTemplate('./js/templates/notifications.html', (tmpl) => {
      var $container = $('<div class="border0 custCol-border-secondary flexRow marginLeft1" />');

      this.$el.html(
        tmpl({
          isFetching: isFetching,
          collection: this.collection.toJSON()
        })
      );

      this.$jsNotifWrap = this.$('.js-notif-wrap');

      if (!isFetching) {
        this.collection.forEach((md) => {
          var vw = new NotificationVw({
            model: md
          });

          $container.append(vw.render().el);
          this.registerChild(vw);
          this.notifications.push(vw);

          this.listenTo(vw, 'notification-click', this.notificationClick);
        });

      }

      this.$jsNotifWrap.append($container);

      // restore scroll position
      if (!isFetching && prevScroll.top) {
        this.$jsNotifWrap[0].scrollTop = prevScroll.top + (this.$jsNotifWrap[0].scrollHeight - prevScroll.height);
      }      
    });

    return this;
  }
});