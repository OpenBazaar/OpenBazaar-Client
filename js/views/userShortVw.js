var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow borderBottom custCol-border-secondary",

  events: {
    'click .js-userShort': 'userClick'
  },

  initialize: function() {
    "use strict";
    var self = this;
    this.preloadedAvatar = false;
    this.preLoadAvatar = $('<img>').on('load', function(){
      self.preloadedAvatar = true;
      //if view renders after image is loaded
      self.$el.find('.thumbnail').addClass('thumbnailLoaded');
    });
    this.preLoadAvatar.attr('src', this.model.get('avatarURL'));
    this.render();
  },

  render: function(){
    "use strict";
    var self = this;
    loadTemplate('./js/templates/userShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
      if(self.preloadedAvatar === true){
        //if image loaded before view was rendered
        self.$el.find('.thumbnail').addClass('thumbnailLoaded');
      }
    });
    return this;
  },

  userClick: function(e){
    "use strict";
    Backbone.history.navigate('#userPage/'+this.model.get('guid')+'/store', {trigger: true});
  }

});