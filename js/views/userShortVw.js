var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate'),
    baseVw = require('./baseVw');

module.exports = baseVw.extend({

  className: "flexRow borderBottom custCol-border js-userShortView",

  events: {
    'click .js-userShort': 'userClick',
    'click .js-userShortFollow': 'followUser',
    'click .js-userShortUnfollow': 'unfollowUser'
  },

  initialize: function() {
    "use strict";

    this.listenTo(window.obEventBus, "blockingUser", function(e){
      if (e.guid == this.model.get('guid')) {
        this.model.set('isBlocked', true);
      }      
    });

    this.listenTo(window.obEventBus, "unblockingUser", function(e){
      if (e.guid == this.model.get('guid')) {
        this.model.set('isBlocked', false);
      }
    });

    this.render();        
  },

  render: function(){
    "use strict";
    var self = this;
    loadTemplate('./js/templates/userShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  userClick: function(e){
    "use strict";
    Backbone.history.navigate('#userPage/'+this.model.get('guid')+'/store', {trigger: true});
  },

  followUser: function(e){
    "use strict";
    window.obEventBus.trigger('followUser', {'guid': this.model.get('guid'), 'target': $(e.target)});
    this.$el.addClass('div-fade');
    this.$el.find('.js-userShortUnfollow').removeClass('hide');
    this.$el.find('.js-userShortFollow').addClass('hide');
  },

  unfollowUser: function(e){
    "use strict";
    window.obEventBus.trigger('unfollowUser', {'guid': this.model.get('guid'), 'target': $(e.target)});
    this.$el.addClass('div-fade');
    this.$el.find('.js-userShortUnfollow').addClass('hide');
    this.$el.find('.js-userShortFollow').removeClass('hide');
  }
});