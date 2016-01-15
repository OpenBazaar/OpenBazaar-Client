var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js'),
    setTheme = require('../utils/setTheme.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    purchasesCl = require('../collections/purchasesCl'),
    orderShortVw = require('./orderShortVw'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    transactionModalVw = require('./transactionModalVw'),
    countriesMd = require('../models/countriesMd');

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
    var self = this,
        profile = options.userProfile.get('profile'),
        wrapper = "<ul class='list flexRow'></ul>";

    this.options = options;
    this.state = options.state || "purchases";
    this.userModel = this.options.userModel;
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", profile);
    setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    this.serverUrl = options.userModel.get('serverUrl');
    this.cCode = options.userModel.get('currency_code');
    this.listenTo(window.obEventBus, "openOrderModal", function(orderID){
      self.openOrderModal(orderID);
    });
    this.searchTransactions;
    this.subViews = [];
    this.subModels = [];

    this.countries = new countriesMd();
    this.countriesArray = this.countries.get('countries');

    this.subModels.push(this.countries);

    getBTPrice(this.cCode, function(btAve){
      self.btAve = btAve;
      self.purchasesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.purchasesCol.url = self.serverUrl + "get_purchases";
      self.purchasesWrapper = $(wrapper);

      self.salesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.salesCol.url = self.serverUrl + "get_sales";
      self.salesWrapper = $(wrapper);

      self.casesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.casesCol.url = self.serverUrl + "get_cases";
      self.casesWrapper = $(wrapper);

      self.render();
    });
  },

  getData: function(){
    "use strict";
    var self = this;

    this.purchasesCol.fetch({
      success: function(models){
        console.log(models);
        self.renderPurchases();
      }
    });
    if(this.model.get('page').vendor){
      this.salesCol.fetch({
        success: function(models){
          self.renderSales();
        }
      });
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
    //add action to history
    Backbone.history.navigate("#transactions/" + state);
  },

  tabHandler: function(e){
    "use strict";
    var tab = $(e.target),
        tabID = tab.data("tab"),
        showContent = this.$el.find('.js-'+tabID);

    this.setTab(tab, showContent);
    this.setState(tabID);
  },

  transactionFilter: function(){
    "use strict";
    var filterBy = this.$el.find(".js-transactionFilter").val();
    console.log("filter by "+filterBy);
    switch(this.state){
      case "purchases":
        this.renderPurchases(filterBy);
        break;
      case "sales":
        this.renderSales(filterBy);
        break;
      case "cases":
        this.renderCases(filterBy);
        break;
    }
  },

  renderPurchases: function(filterBy){
    "use strict";
    var self = this;
    this.purchasesWrapper.html('');
    if(filterBy == "dateNewest"){
      this.purchasesCol.comparator = function(model) {
        return -model.get("timestamp");
      };
      this.purchasesCol.sort();
    }
    if(filterBy == "dateOldest"){
      this.purchasesCol.comparator = function(model) {
        return model.get("timestamp");
      };
      this.purchasesCol.sort();
    }
    console.log(this.purchasesCol.models)
    this.purchasesCol.each(function(model, i){
      if(!filterBy || filterBy == "all" || filterBy == "dateNewest" || filterBy == "dateOldest"){
        self.addPurchase(model);
      } else if(filterBy && filterBy != "dateNewest" && filterBy != "dateOldest" && model.get('status') == filterBy) {
        self.addPurchase(model);
      }
    });
    this.$el.find(".js-purchases").append(this.purchasesWrapper);
    this.searchTransactions = new window.List('transactionsHolder', {valueNames: ['js-searchOrderID', 'js-searchStatus', 'js-searchTitle'], page: 1000});
    console.log(this.$('#transactionsHolder'))
  },

  addPurchase: function(model){
    model.set('imageUrl', this.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
    model.set('transactionType', "purchase");
    var orderShort = new orderShortVw({
      model: model
    });
    this.subViews.push(orderShort);
    this.purchasesWrapper.append(orderShort.render().el);
  },

  renderSales: function(filterBy){
    "use strict";
    var self = this;
    this.salesWrapper.html('');
    this.salesCol.each(function(model, i){
      if(!filterBy || filterBy == "all"){
        self.addSale(model);
      } else if(filterBy && model.get('status') == filterBy) {
        self.addSale(model);
      }
    });
    this.$el.find(".js-sales").append(this.salesWrapper);
    this.searchTransactions = new window.List('transactionsHolder', {valueNames: ['js-searchOrderID', 'js-searchStatus', 'js-searchTitle'], page: 1000});

  },

  addSale: function(model){
    "use strict";
    model.set('imageUrl', this.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
    model.set('transactionType', "sale");
    var orderShort = new orderShortVw({
      model: model
    });
    this.subViews.push(orderShort);
    this.salesWrapper.append(orderShort.render().el);
  },

  renderCases: function(models){
    "use strict";

  },

  openOrderModal: function(options){
    "use strict";
    var orderModalView = new transactionModalVw({
      orderID: options.orderID,
      status: options.status,
      serverUrl: this.serverUrl,
      parentEl: this.$el.find('.js-transactionModalHolder'),
      countriesArray: this.countriesArray,
      cCode: this.userModel.get('currency_code'),
      btAve: this.btAve,
      state: this.state,
      bitcoinValidationRegex: this.userModel.get('bitcoinValidationRegex'),
      transactionType: options.transactionType
    });
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