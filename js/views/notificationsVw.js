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
    this.fetch = this.options.initialFetch;
    
    this.listenTo(this.collection, 'update', (cl, options) => {
      var $notifPage = $('<div />');

      // we're assuming the only additions will either be a batch of
      // models at the bottom (lazy loaded via scroll) -or- a new
      // model at the top (new notification via socket) 
      cl.forEach((md, index) => {
        if (!md.notifCreated) {
          if (cl.indexOf(md) === 0) {
            // new notif via socket
            this.addNotificationsToDom(
              this.createNotification(md).render().el,
              true
            );
          } else {
            // new page of notifs
            $notifPage.append(this.createNotification(md).render().el);
          }
        }
      });

      if ($notifPage.children().length) {
        this.addNotificationsToDom($notifPage);
      }
    });

    this.listenTo(this.collection, 'reset', this.render);

    this.listenTo(this.collection, 'request', (cl, xhr, options) => {
      this.fetch = xhr;
      this.$pageSpinner.removeClass('hide');
      xhr.done(() => this.$pageSpinner.addClass('hide'));
    });    

    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
  },

  notificationClick: function(e) {
    this.trigger('notification-click', e);
  },

  resetScroll: function() {
    if (this.$scrollContainer) this.$scrollContainer[0].scrollTop = 0;
  },

  onScroll: function(e) {
    var startId = this.collection.at(this.collection.length - 1).id;

    if (
        !this.fetchedAll &&
        !(this.fetch && this.fetch.state() === 'pending') &&
        this.$scrollContainer[0].scrollTop + this.$scrollContainer[0].clientHeight + 400 > this.$scrollContainer[0].scrollHeight
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

  createNotification: function(md) {
    var vw = new NotificationVw({
      model: md
    });

    md.notifCreated = true;
    this.registerChild(vw);
    this.notifications.push(vw);
    this.listenTo(vw, 'notification-click', this.notificationClick);

    return vw;
  },

  addNotificationsToDom: function($notifications, prepend) {
    var prevScroll = {};

    prevScroll.height = this.$scrollContainer[0].scrollHeight;
    prevScroll.top = this.$scrollContainer[0].scrollTop;

    if (!prepend) {
      this.$notifContainer.append($notifications);
      this.$scrollContainer[0].scrollTop = prevScroll.top;
    } else {
      this.$notifContainer.prepend($notifications);
      this.$scrollContainer[0].scrollTop = prevScroll.top + (this.$scrollContainer[0].scrollHeight - prevScroll.height);
    }
  },

  render: function() {
    var prevScroll = {},
        isFetching = this.fetch && this.fetch.state() === 'pending';

    this.notifications = this.notifications || [];
    this.notifications.forEach((vw) => {
      vw.remove();
    });
    this.notifications = [];

    loadTemplate('./js/templates/notifications.html', (tmpl) => {
      var $container = $('<div />');

      this.$el.html(
        tmpl({
          isFetching: isFetching,
          collection: this.collection.toJSON()
        })
      );

      this.$scrollContainer = this.$('.js-notif-scroll-wrap');
      this.$scrollContainer.on('scroll', this.scrollHandler);
      this.$notifContainer = this.$('.js-notif-container');

      if (!isFetching) {
        this.collection.forEach((md) => {
          $container.append(this.createNotification(md).render().el);
          this.addNotificationsToDom($container);
        });

        if (this.collection.length) {
          this.$pageSpinner = this.$('.js-page-spinner');
        }
      }
    });

    return this;
  },

  remove: function() {
    this.$scrollContainer && this.$scrollContainer.off('scroll', this.scrollHandler);

    baseVw.prototype.remove.apply(this, arguments);    
  }
});