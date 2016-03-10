var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw'),
    NotificationVw = require('../views/notificationVw');

module.exports = baseVw.extend({
  events: {
  },

  NOTIF_PER_FETCH: 10,

  initialize: function(options) {
    var options = options || {};

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }    

    this.options = options;
    this.fetch = this.options.fetch;
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'request', (cl, xhr, options) => {
      this.fetch = xhr;
    });    

    if (this.fetch) {
      this.fetch.done(() => {
        !this.collection.length && this.render()
      });
    }

    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
  },

  notificationClick: function(e) {
    this.trigger('notification-click', e);
  },

  resetScroll: function() {
    if (this.$jsNotifWrap) this.$jsNotifWrap[0].scrollTop = 0;
  },

  onScroll: function(e) {
    var startId = this.collection.at(this.collection.length - 1).id;

    if (
        !this.fetchedAll &&
        !(this.fetch && this.fetch.state() === 'pending') &&
        this.$jsNotifWrap[0].scrollTop + this.$jsNotifWrap[0].clientHeight + 200 > this.$jsNotifWrap[0].scrollHeight
      ) {
      this.collection.fetch({
        remove: false,
        data: {
          start: startId,
          limit: (typeof this.options.notifPerFetch === 'undefined' ? this.NOTIF_PER_FETCH : this.options.notifPerFetch) + 1
        }
      }).done(() => {
        if (this.collection.at(this.collection.length - 1).id === startId) {
          this.fetchedAll = true;
        }
      });
    }    
  },

  render: function() {
    var prevScroll = {},
        isFetching = this.fetch && this.fetch.state() === 'pending';

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
      this.$jsNotifWrap.on('scroll', this.scrollHandler);

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

      // - restore scroll position -
      // for a smooth scrolling experience, we need to adjust the scroll position
      // slightly differently, depending on if content was added to the top
      // or bottom of the list
      if (prevScroll.top) {
        if (this.collectionAtRender.length && this.collectionAtRender.at(0).id !== this.collection.at(0).id) {
          // new content on top - socket notification came in
          this.$jsNotifWrap[0].scrollTop = prevScroll.top + (this.$jsNotifWrap[0].scrollHeight - prevScroll.height);
        } else {
          // new content on bottom - user lazy loaded via scroll
          this.$jsNotifWrap[0].scrollTop = prevScroll.top;        
        }
      }      
    });

    this.collectionAtRender = this.collection.clone();

    return this;
  },

  remove: function() {
    this.$jsNotifWrap && this.$jsNotifWrap.off('scroll', this.scrollHandler);

    baseVw.prototype.remove.apply(this, arguments);    
  }
});