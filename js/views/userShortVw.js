var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var loadTemplate = require('../utils/loadTemplate');

module.exports = Backbone.View.extend({

  className: "flexRow",

  events: {
    'click .js-userShort': 'userClick'
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

  userClick: function(e){
    var self = this;
    Backbone.history.navigate('#userPage/'+this.model.get('userID')+'/store', {trigger: true});
  }

});