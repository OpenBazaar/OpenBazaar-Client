var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js');

module.exports = Backbone.View.extend({

  className: "purchasesView",

  events: {

  },

  initialize: function(options){
    "use strict";
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", options.userProfile.get('profile'));
    this.subViews = [];
    this.subModels = [];
  },

  getData: function(){
    "use strict";

  },

  render: function(){
    "use strict";
    var self = this;
    $('#content').html(self.$el);
    loadTemplate('./js/templates/purchases.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
  }
});