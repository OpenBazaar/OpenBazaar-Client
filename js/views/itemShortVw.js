'use strict';

var Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  className: "flexCol-4 border0",

  events: {
    'click .js-item': 'itemClick',
    'click .js-avatar': 'avatarClick',
    'click .js-about': 'aboutClick',
    'click .js-itemShortEdit': 'editItemClick',
    'click .js-itemShortDelete': 'deleteItemClick',
    'click .js-itemShortDeleteConfirm': 'deleteItem',
    'click .js-itemShortDeleteCancel': 'cancelConfirmDelete',
    'click .js-itemShortClone': 'cloneItemClick',
    'click .js-userShortFollow': 'followUser',
    'click .js-userShortUnfollow': 'unfollowUser',
    'click .js-blockUser': 'blockUser',
    'click .js-unblockUser': 'unblockUser'
  },

  initialize: function(options){
    //pre-load image
    this.parentEl = $(options.parentEl);
    this.listenTo(this.model, 'change', this.render);
    //if price has already been set, render
    if (this.model.get('priceSet') !== 0){
      this.render();
    }

    //store avatar reference in localStorage for other views
    var localAvatar = this.model.get('avatarURL') || this.model.get('serverUrl')+"get_image?hash="+this.model.avatar_hash+"&guid="+this.model.get('guid');
    localAvatar && localStorage.setItem('userAvatar-'+this.model.get('guid'), localAvatar);

    this.listenTo(window.obEventBus, "followUser", function(options){
      if (options.view === this || options.guid !== this.model.get('guid')) {
        return;
      }

      this.model.set('ownFollowing', true);
    });

    this.listenTo(window.obEventBus, "unfollowUser", function(options){
      if (options.view === this || options.guid !== this.model.get('guid')) {
        return;
      }

      this.model.set('ownFollowing', false);
    });

    this.listenTo(window.obEventBus, "blockingUser", function(e){
      if (e.guid == this.model.get('guid')) {
        this.model.set('isBlocked', true);
      }      
    });

    this.listenTo(window.obEventBus, "unblockingUser", function(e){
      if (e.guid !== this.model.get('guid')) {
        this.model.set('isBlocked', false);
      }      
    });
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/itemShort.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      //append the view to the passed in parent
      self.parentEl.append(self.$el);
    });
    return this;
  },

  itemClick: function(){
    var skipNSFWmodal = this.model.get('skipNSFWmodal') ? "/" + this.model.get('skipNSFWmodal') : "";
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/listing/'+this.model.get('contract_hash') + skipNSFWmodal, {trigger: true});
  },

  aboutClick: function(){
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/about', {trigger: true});
  },

  avatarClick: function(){
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/store', {trigger: true});
  },

  editItemClick: function(){
    window.obEventBus.trigger('itemShortEdit', {'contract_hash': this.model.get('contract_hash')});
  },

  deleteItemClick: function(e){
    console.log("1")
    this.$(e.target).closest('.gridItemControls').find(".js-deleteOverlay").addClass("fadeIn");
  },

  cancelConfirmDelete: function(e){
    console.log("2")
    e.stopPropagation();
    this.$(e.target).closest('.gridItemControls').find(".js-deleteOverlay").removeClass("fadeIn");
  },

  deleteItem: function(){
    window.obEventBus.trigger('itemShortDelete', {'contract_hash': this.model.get('contract_hash')});
  },

  cloneItemClick: function() {
    window.obEventBus.trigger('itemShortClone', {'contract_hash': this.model.get('contract_hash')});
  },

  followUser: function(e) {
    if (this.model.get('guid') !== this.model.get('ownGuid')){
      window.obEventBus.trigger('followUser', {'guid': this.model.get('guid'), 'target': $(e.target), view: this});
      this.$el.find('.js-userShortUnfollow').removeClass('hide');
      this.$el.find('.js-userShortFollow').addClass('hide');
    }
  },

  unfollowUser: function(e){
    if (this.model.get('guid') !== this.model.get('ownGuid')) {
      window.obEventBus.trigger('unfollowUser', {'guid': this.model.get('guid'), 'target': $(e.target), view: this});
      this.$el.find('.js-userShortUnfollow').addClass('hide');
      this.$el.find('.js-userShortFollow').removeClass('hide');
    }
  },

  blockUser: function(e) {
    this.trigger('blockUserClick', { originalEvent: e, view: this });
  },  

  unblockUser: function(e) {
    this.trigger('unblockUserClick', { originalEvent: e, view: this });
  }
});