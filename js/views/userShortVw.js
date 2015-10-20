var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow",

  events: {
    'click .js-storeListFollow': 'followUser'
  },

  initialize: function() {
    "use strict";
    this.render();
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/userShort.html', function(loadedTemplate) {
      self.$el.append(loadedTemplate(self.model.toJSON()));
    });
    return this;
  },

  followUser: function(e){
    console.log("follow user button clicked");
  }

});