var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js'),
    setTheme = require('../utils/setTheme.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    purchasesCl = require('../collections/purchasesCl'),
    orderShortVw = require('./orderShortVw');

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
    var profile = options.userProfile.get('profile'),
        wrapper = "<div></div>";

    this.state = options.state || "purchases";
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", profile);
    setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    this.serverUrl = options.userModel.get('serverUrl');

    this.purchasesCol = new purchasesCl();
    this.purchasesCol.url = this.serverUrl + "get_purchases";
    this.purchasesWrapper = $(wrapper);

    this.salesCol = new Backbone.Collection();
    this.salesCol.url = this.serverUrl + "get_sales";
    this.salesWrapper = $(wrapper);

    this.casesCol = new Backbone.Collection();
    this.casesCol.url = this.serverUrl + "get_cases";
    this.casesWrapper = $(wrapper);

    this.subViews = [];
    this.subModels = [];
    this.render();
  },

  getData: function(){
    "use strict";
    var self = this;
    console.log("getData");
    this.purchasesCol.fetch({
      success: function(models){
        console.log(models);
        self.renderPurchases();
      }
    });
    if(this.model.get('page').vendor){
      //this.salesCol.fetch();
    }
    if(this.model.get('page').moderator){
      //this.casesCol.fetch(); //not ready yet
    }
  },

  render: function(){
    "use strict";
    var self = this;
    $('#content').html(self.$el);
    loadTemplate('./js/templates/transactions.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));
      self.setState(self.state);
      self.getData();
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
  },

  renderPurchases: function(){
    "use strict";
    var self = this;
    this.purchasesCol.each(function(model, i){
      console.log(model);
      console.log(model.get('thumbnail_hash'));
      model.set('imageUrl', self.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
      var orderShort = new orderShortVw({
        model: model,
      });
      self.subViews.push(orderShort);
      self.purchasesWrapper.append(orderShort.render().el);
    });
    this.$el.find(".js-purchases").append(this.purchasesWrapper);
  },

  renderSales: function(models){
    "use strict";

  },

  renderCases: function(models){
    "use strict";

  }
});