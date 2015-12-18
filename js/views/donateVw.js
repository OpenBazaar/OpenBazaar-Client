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
      self.$el.find('a').on('click', function(e){
        e.preventDefault();
        var extUrl = $(this).attr('href');
        if (!/^https?:\/\//i.test(extUrl)) {
          extUrl = 'http://' + extUrl;
        }
        require("shell").openExternal(extUrl);
      });
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
  }

});