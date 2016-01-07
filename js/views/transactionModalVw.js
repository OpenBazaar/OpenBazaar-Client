var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    is = require('is_js'),
    loadTemplate = require('../utils/loadTemplate'),
    saveToAPI = require('../utils/saveToAPI');

module.exports = Backbone.View.extend({

  classname: "modal modal-opaque js-transactionModal",

  events: {
    'click .js-transactionModal': 'blockClicks',
    'click .js-closeModal': 'closeModal'
  },

  initialize: function (options) {
    "use strict";
    var self = this;

    this.orderID = options.orderID;
    this.serverUrl = options.serverUrl;
    this.model = new Backbone.Model();
    this.model.urlRoot = options.serverUrl + "get_order"; //replace with real API call when ready
    this.model.fetch({
      data: $.param({'order_id': self.orderID}),
      success: function(model){
        console.log(model);
        self.render();
      }
    });
  },

  render: function () {
    "use strict";
    "use strict";
    var self = this;

    loadTemplate('./js/templates/transactionModal.html', function(loadedTemplate) {
      //hide the modal when it first loads
      self.$el.attr('style', 'display:none');
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.$el.fadeIn(300);
    });
  },

  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();
  },

  closeModal: function(){
    this.$el.find('.js-transactionModal').fadeOut(300);
  },

  close: function(){
    "use strict";
    __.each(this.subModels, function(subModel) {
      subModel.off();
    });
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });

    this.model.off();
    this.off();
    this.remove();
  }
});