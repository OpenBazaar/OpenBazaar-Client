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
     options.serverUrl: server url to pass into each user view
     options.ownFollowing: array of guids this user is following
     options.hideFollow: boolean, hide follow button
     */
    //the model must be passed in by the constructor
    this.usersShort = new usersShortCollection(this.model);
    this.subViews = [];
    this.showPerScroll = 10;
    this.nextUserToShow = 0;
    this.$container = $('#obContainer');
    this.render();
  },

  render: function(){
    var self = this;
    this.listWrapper = $('<div class="list flexRow flexExpand border0 custCol-border"></div>');

    if(this.usersShort.models.length > 0)
    {
      this.renderUserSet(this.nextUserToShow, this.showPerScroll);

      //listen to scrolling on container
      this.scrollHandler = __.bind(
          __.throttle(this.onScroll, 100), this
      );
      this.$container.on('scroll', this.scrollHandler);

      this.$el.html(this.listWrapper);

    }else{
      self.renderNoneFound();
    }
  },

  renderUserSet: function(start, end){
    var self = this,
        renderSet = __.filter(this.usersShort.models, function(value, index){
          return (index >= start) && (index < end);
        });

    __.each(renderSet, function(user) {
      user.set('avatarURL', self.options.serverUrl+"get_image?hash="+user.get('avatar_hash')+"&guid="+user.get('guid'));
      if(self.options.ownFollowing.indexOf(user.get('guid')) != -1){
        user.set("ownFollowing", true);
      }
      user.set('hideFollow', self.options.hideFollow);
      self.renderUser(user);
    }, this);

    this.nextUserToShow = this.nextUserToShow + this.showPerScroll;
  },

  renderUser: function(item){
    var storeShort = new userShortView({
      model: item
    });
    this.subViews.push(storeShort);
    this.listWrapper.prepend(storeShort.el);
  },

  onScroll: function(){
    if (
        !(this.fetch && this.fetch.state() === 'pending') &&
        this.$container[0].scrollTop + this.$container[0].clientHeight + 200 > this.$container[0].scrollHeight
      ) {
      this.renderUserSet(this.nextUserToShow, this.nextUserToShow + this.showPerScroll);
    }
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
    this.scrollHandler && this.listWrapper.off('scroll', this.scrollHandler);
  }
});

