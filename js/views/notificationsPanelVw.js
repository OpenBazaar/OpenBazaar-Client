var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    notificationsCollection = require('../collections/notificationsCl'),
    notificationView = require('./notificationVw');

module.exports = Backbone.View.extend({

  el: '#notificationsPanel',

  initialize: function(options){
    var self = this;
    this.options = options || {};
    //the model must be passed in by the constructor
    this.notifications = new notificationsCollection({url: options.url});
    this.notifications.fetch(
        {
      success: function(notifications, response) {
        notifications.each(function(model) {
          console.log('Async Item:', model.toJSON());
          self.renderNotification(model);
        });
        this.$el.html(this.listWrapper);
        self.render();
      }
    }
    );

    this.subViews = [];

  },

  render: function(){
    var self = this;
    this.listWrapper = $('<div class="border0 custCol-border-secondary"></div>')

    console.log('In Render:', this.notifications.toJSON());
    this.$el.html(this.notifications);

    //if(this.notifications.models.length > 0)
    //{
    //  console.log(this.notifications.models);
    //  __.each(this.notifications.models, function (notification)
    //  {
    //    server_url = self.options.model.attributes.server_url;
    //    console.log('sat', notification);
    //    notification.set('avatarURL', server_url+"get_image?hash="+notification.get('image_hash')+"&guid="+notification.get('guid'));
    //    self.renderNotification(notification);
    //  }, this);
    //  this.$el.html(this.listWrapper);
    //}else{
    //  self.renderNoneFound();
    //}
  },

  renderNotification: function(item){
    var notification = new notificationView({
      model: item
    });
    this.subViews.push(notification);
    //$el must be passed in by the constructor
    //appending to the DOM one by one is too slow, and the last 1/3 of the items won't be added. Add to a holder element instead.
    console.log('In renderNotification');
    this.listWrapper.append(notification.el);
  },

  renderNoneFound: function(){
    console.log('none found');
    //var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    //this.subViews.push(simpleMessage);
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
    delete this.$el;
    delete this.el;
  }
});

