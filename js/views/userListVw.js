var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    usersShortCollection = require('../collections/usersShortCl'),
    userShortView = require('./userShortVw'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    var self = this;
    this.options = options || {};
    /*expected options:
      options.title: title for no users found
      options.message: message for no users found
      options.server_url: server url to pass into each user view
    */
    //the model must be passed in by the constructor
    this.usersShort = new usersShortCollection(this.model);
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    this.listWrapper = $('<div class="flexRow flexExpand border0 custCol-border-secondary"></div>');
    if(this.usersShort.models.length > 0)
    {
      __.each(this.usersShort.models, function (user)
      {
        user.set('avatarURL', self.options.server_url+"get_image?hash="+user.get('avatar_hash')+"&guid="+user.get('guid'));
        self.renderUser(user);
      }, this);
      this.$el.html(this.listWrapper);
    }else{
      self.renderNoneFound();
    }
  },

  renderUser: function(item){
    var storeShort = new userShortView({
      model: item
    });
    this.subViews.push(storeShort);
    //$el must be passed in by the constructor
    //this.$el.append(storeShort.el);
    //appending to the DOM one by one is too slow, and the last 1/3 of the items won't be added. Add to a holder element instead.
    this.listWrapper.append(storeShort.el);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
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

