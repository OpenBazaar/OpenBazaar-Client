var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js');

module.exports = Backbone.View.extend({

  className: "transactionsView",

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
    loadTemplate('./js/templates/transactions.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setState(self.options.state);
    });
  },

  addTabToHistory: function(state){
    "use strict";
    //add action to history
    Backbone.history.navigate("#transactions/" + state);
    this.options.state = state;
  },

  setTab: function(activeTab, showContent, state){
    "use strict";
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state){
    "use strict";
    state = state || "purchases";
    this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    $('#content').find('input:visible:first').focus();
  },
});