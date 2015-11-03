var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    donateModel = require('../models/donateMd'),    
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "donateView",

  initialize: function(){
    this.model = new donateModel();
    this.render();
  },

  render: function(){
    var self = this;
    $('#content').html(this.$el);
    loadTemplate('./js/templates/donate.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
    });
    return this;
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