var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  events: {
  },

  initialize: function() {
    "use strict";
    console.log("buy addresses view init");
    console.log(this.model);
    this.render(this.model);
  },

  render: function(renderModel){
    var self = this;
    loadTemplate('./js/templates/buyAddresses.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(renderModel.toJSON()));
      //this does not add it to the DOM, that is done by the parent view
    });
    return this;
  },

  setAddress: function(){
    "use strict";
    var addressData = "";
    this.trigger('setBuyAddress', addressData);
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