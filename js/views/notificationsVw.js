var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    // app = require('../App.js').getApp(),
    baseVw = require('./baseVw'),
    NotificationVw = require('../views/notificationVw');

module.exports = baseVw.extend({
  // className: 'popMenu-notificationsContent flex-border',

  events: {
  },

  initialize: function(options) {
    var options = options || {};

    // if (!options.model) {
    //   throw new Error('Please provide a model of the logged-in user.');
    // }

    if (!options.collection) {
      throw new Error('Please provide a collection.');
    }    

    if (!options.socketView) {
      throw new Error('Please provide a socketView instance.');
    }    

    this.options = options;
    this.socketView = options.socketView;
    this.listenTo(this.collection, 'sync', this.render);
  },

  // remove: function() {
  //   this.close();

  //   baseVw.prototype.remove.apply(this, arguments);
  // },

  render: function() {
    this.notifications = this.notifications || [];
    this.notifications.forEach((vw) => {
      vw.remove();
    });
    this.notifications = [];

    loadTemplate('./js/templates/notifications.html', (tmpl) => {
      var isFetching = this.options.fetch && this.options.fetch.state() === 'pending',
          $container = $('<div class="border0 custCol-border-secondary flexRow marginLeft1 js-notif-wrap" />');

      this.$el.html(
        tmpl({
          isFetching: isFetching,
          // collection: this.collection.toJSON()
          collection: this.collection.toJSON()
        })
      );

      if (!isFetching) {
        this.collection.forEach((md) => {
          var vw = new NotificationVw({
            model: md
          });

          $container.append(vw.render().el);
          this.registerChild(vw);
          this.notifications.push(vw);
        });

        this.collection.forEach((md) => {
          var vw = new NotificationVw({
            model: md
          });

          $container.append(vw.render().el);
          this.registerChild(vw);
          this.notifications.push(vw);
        });

        this.collection.forEach((md) => {
          var vw = new NotificationVw({
            model: md
          });

          $container.append(vw.render().el);
          this.registerChild(vw);
          this.notifications.push(vw);
        });

        this.collection.forEach((md) => {
          var vw = new NotificationVw({
            model: md
          });

          $container.append(vw.render().el);
          this.registerChild(vw);
          this.notifications.push(vw);
        });                        
      }

      this.$('.js-notif-wrap').append($container);
      // this.$el.append($container);
    });

    return this;
  }
});