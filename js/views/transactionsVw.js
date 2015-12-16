var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js'),
    chosen = require('../utils/chosen.jquery.min.js');

module.exports = Backbone.View.extend({

  className: "transactionsView",

  events: {
    'click .js-purchasesTab': 'tabHandler',
    'click .js-salesTab': 'tabHandler',
    'click .js-casesTab': 'tabHandler',
    'change .js-transactionFilter': 'transactionFilter'
  },

  initialize: function(options){
    "use strict";
    /* expected options:
       userModel
       userProfile
       state (from router)
     */
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", options.userProfile.get('profile'));
    this.subViews = [];
    this.subModels = [];
    this.render();
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
      //set chosen inputs
      $('.chosen').chosen();
    });
  },

  addTabToHistory: function(state){
    "use strict";
    //add action to history
    Backbone.history.navigate("#transactions/" + state);
    this.options.state = state;
  },

  setTab: function(activeTab, showContent){
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

  tabHandler: function(e){
    "use strict";
    var tab = $(e.target),
        tabID = tab.data("tab"),
        showContent = this.$el.find('.js-'+tabID);

    this.addTabToHistory(tabID);
    this.setTab(tab, showContent);
    this.setState(tabID);
  },

  transactionFilter: function(){
    "use strict";
    var filterBy = this.$el.find(".js-transactionFilter").val();
    console.log("filter by "+filterBy);
  }
});