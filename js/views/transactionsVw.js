var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    messageModal = require('../utils/messageModal.js'),
    setTheme = require('../utils/setTheme.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    purchasesCl = require('../collections/purchasesCl'),
    baseVw = require('./baseVw'),
    orderShortVw = require('./orderShortVw'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    transactionModalVw = require('./transactionModalVw'),
    countriesMd = require('../models/countriesMd');

module.exports = baseVw.extend({

  className: "transactionsView",

  events: {
    'click .js-purchasesTab': 'tabHandler',
    'click .js-salesTab': 'tabHandler',
    'click .js-casesTab': 'tabHandler',
    'change .js-transactionFilter': 'transactionFilter',
    'keyup .search': 'searchKeyup',
    'click .js-transactionsSearchClear': 'searchClear'
  },

  initialize: function(options){
    "use strict";
    /* expected options:
       userModel
       userProfile
       state (from router)
       socketView (from router)
     */
    var self = this,
        profile = options.userProfile.get('profile'),
        wrapper = "<ul class='list flexRow width100'></ul>";

    this.options = options;
    this.state = options.state || "purchases";
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", profile);
    this.socketView = options.socketView;
    setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    this.serverUrl = options.userModel.get('serverUrl');
    this.cCode = options.userModel.get('currency_code');
    this.listenTo(window.obEventBus, "openOrderModal", function(orderID){
      self.openOrderModal(orderID);
    });
    this.searchTransactions;

    this.countries = new countriesMd();
    this.countriesArray = this.countries.get('countries');

    this.purchasesWrapper = $(wrapper);
    this.salesWrapper = $(wrapper);
    this.casesWrapper = $(wrapper);


    $('.js-loadingModal').removeClass("hide");
    getBTPrice(this.cCode, function(btAve){
      $('.js-loadingModal').addClass("hide");
      self.btAve = btAve;
      self.purchasesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.purchasesCol.url = self.serverUrl + "get_purchases";

      self.salesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.salesCol.url = self.serverUrl + "get_sales";

      self.casesCol = new purchasesCl(null, {btAve: btAve, cCode: self.cCode});
      self.casesCol.url = self.serverUrl + "get_cases";

      self.render();
    });
  },

  getData: function(){
    "use strict";
    var self = this;

    this.purchasesCol.fetch({
      success: function(models){
        //self.renderPurchases();
        self.renderTab("purchases", self.purchasesCol, self.purchasesWrapper);
        self.setSearchList('transactionsPurchases');
        if(self.model.get('page').vendor){
          self.salesCol.fetch({
            success: function(models){
              //self.renderSales();
              self.renderTab("sales", self.salesCol, self.salesWrapper);
              self.setSearchList('transactionsSales');
              if(self.model.get('page').moderator){
                self.casesCol.fetch({
                  success: function(models) {
                    //self.renderCases();
                    self.renderTab("cases", self.casesCol, self.casesWrapper);
                    self.setSearchList('transactionsCases');
                  }
                });
              }
            }
          });
        }
      }
    });


  },

  setSearchList: function(targetID){
    "use strict";
    this.searchTransactions = new window.List(targetID, {valueNames: ['js-searchOrderID', 'js-searchStatus', 'js-searchTitle'], page: 1000});
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
    // $('#content').find('input:visible:first').focus();
    //add action to history
    Backbone.history.navigate("#transactions/" + state);
  },

  tabHandler: function(e){
    "use strict";
    var tab = $(e.target).closest('.js-tab'),
        tabID = tab.data("tab"),
        showContent = this.$el.find('.js-'+tabID);

    this.setTab(tab, showContent);
    this.setState(tabID);
  },

  searchKeyup: function(e){
    "use strict";
    this.$('.js-transactionsSearchClear').removeClass('hide');
  },

  searchClear: function(){
    "use strict";
    this.$('.search').val("");
    this.$('.js-transactionsSearchClear').addClass('hide');
    this.renderPurchases();
  },

  transactionFilter: function(e){
    "use strict";
    var tab = $(e.target),
        tabTarget = tab.data("tab"),
        filterBy = tab.val();
    this.$('.js-'+tabTarget+' .search').val("");
    switch(tabTarget){
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

  renderTab: function(tabName, tabCollection, tabWrapper, filterBy){
    "use strict";
    var self = this;
    tabWrapper.html('');
    if(!filterBy || filterBy == "all" || filterBy == "dateNewest"){
      tabCollection.comparator = function(model) {
        return -model.get("timestamp");
      };
      tabCollection.sort();
    }
    if(filterBy == "dateOldest"){
      tabCollection.comparator = function(model) {
        return model.get("timestamp");
      };
      tabCollection.sort();
    }
    tabCollection.each(function(model, i){
      if(!filterBy || filterBy == "all" || filterBy == "dateNewest" || filterBy == "dateOldest"){
        self.addTransaction(model, tabWrapper, tabName);
      } else if(filterBy && filterBy != "dateNewest" && filterBy != "dateOldest" && model.get('status') == filterBy) {
        self.addTransaction(model, tabWrapper, tabName);
      }
    });

    this.$el.find('.js-'+tabName+'Count').html(tabCollection.length);
    this.$el.find('.js-'+tabName).append(tabWrapper);
  },

  addTransaction: function(model, tabWrapper, type){
    model.set('imageUrl', this.serverUrl +"get_image?hash="+ model.get('thumbnail_hash'));
    model.set('transactionType', type);
    var orderShort = new orderShortVw({
      model: model
    });
    this.registerChild(orderShort);
    tabWrapper.append(orderShort.render().el);
  },

  openOrderModal: function(options){
    "use strict";
    $('.js-loadingModal').removeClass("hide");
    var orderModalView = new transactionModalVw({
      orderID: options.orderID,
      status: options.status,
      serverUrl: this.serverUrl,
      parentEl: this.$el.find('.js-transactionModalHolder'),
      countriesArray: this.countriesArray,
      cCode: this.userModel.get('currency_code'),
      btAve: this.btAve,
      state: this.state,
      tabState: options.tabState,
      bitcoinValidationRegex: this.userModel.get('bitcoinValidationRegex'),
      transactionType: options.transactionType,
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView
    });
    this.listenTo(orderModalView, "closed", function(){
      this.getData();
    });
  }
});