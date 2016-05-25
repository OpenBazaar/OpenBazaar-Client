'use strict';

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    usersShortCollection = require('../collections/usersShortCl'),
    userShortView = require('./userShortVw'),
    simpleMessageView = require('./simpleMessageVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options || {};
    /*expected options:
     options.title: title for no users found
     options.message: message for no users found
     options.serverUrl: server url to pass into each user view
     options.ownFollowing: array of guids this user is following
     options.hideFollow: boolean, hide follow button
     options.reverse: should the list of users be reversed?
     options.perFetch: the number of users returned per fetch (optional, only applies to the get_followers api)
     options.followerCount: the total number of followers (optional, only applise to the get_followers api)
     */
    //the model must be passed in by the constructor
    this.usersShort = new usersShortCollection(this.model);
    this.options.reverse && this.usersShort.models.reverse();
    this.subViews = [];
    this.showPerScroll = 30;
    this.nextUserToShow = 0;
    this.fetchedUsers = this.usersShort.length;
    this.totalUsers = this.options.followerCount;
    this.$container = $('#obContainer');

    //listen to scrolling on container
    this.scrollHandler = __.bind(
        __.throttle(this.onScroll, 100), this
    );
    this.$container.on('scroll', this.scrollHandler);

    this.listenTo(this.usersShort, 'add', ()=>{
      this.fetchedUsers = this.usersShort.length;
      this.renderUserSet(this.nextUserToShow, this.nextUserToShow + this.showPerScroll);
    });

    this.render();
  },

  render: function(){
    var self = this;

    if (this.usersShort.models.length > 0) {
      this.listWrapper = $('<div class="list flexRow flexExpand border0 custCol-border"></div>');
      this.renderUserSet(this.nextUserToShow, this.showPerScroll);
      this.$el.html(this.listWrapper);
    } else {
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
      if (self.options.ownFollowing.indexOf(user.get('guid')) != -1){
        user.set("ownFollowing", true);
      }
      user.set('hideFollow', self.options.hideFollow);
      self.renderUser(user);
    }, this);

    //if at least one user was added, trigger call so parent can refresh searches
    if (renderSet.length > 0){
      this.trigger('usersAdded');
    }

    this.nextUserToShow = this.nextUserToShow >= this.fetchedUsers ? this.nextUserToShow : this.nextUserToShow + this.showPerScroll;

    if (this.fetchedUsers < this.totalUsers && this.$el.is(':visible')){
      this.trigger('fetchMoreUsers');
    }
  },

  renderUser: function(item){
    var storeShort = new userShortView({
      model: item
    });
    this.subViews.push(storeShort);
    this.listWrapper.append(storeShort.el);
  },

  onScroll: function(){
    if (this.$container[0].scrollTop + this.$container[0].clientHeight + 200 > this.$container[0].scrollHeight &&
        this.listWrapper && this.listWrapper[0].hasChildNodes() && this.listWrapper.is(":visible")) {
      this.renderUserSet(this.nextUserToShow, this.nextUserToShow + this.showPerScroll);
    }
  },

  addUsers: function(model) {
    //add more users to the collection
    this.usersShort.add(model);
  },

  renderNoneFound: function(){
    var simpleMessage = new simpleMessageView({title: this.options.title, message: this.options.message, el: this.$el});
    this.subViews.push(simpleMessage);
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if (subView.close){
        subView.close();
      } else {
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
    this.scrollHandler && this.$container.off('scroll', this.scrollHandler);
  }
});

