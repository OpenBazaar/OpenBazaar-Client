var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    messageModal = require('../utils/messageModal.js'),
    setTheme = require('../utils/setTheme.js'),
    chosen = require('../utils/chosen.jquery.min.js'),
    transactionsCl = require('../collections/transactionsCl'),
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
       orderID (from router)
       socketView (from router)
     */
    var self = this,
        profile = options.userProfile.get('profile'),
        wrapper = "<ul class='list flexRow width100'></ul>";

    this.options = options;
    this.state = options.state || "purchases";
    this.orderID = options.orderID;
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
    this.filterBy; //used for filtering the collections

    this.countries = new countriesMd();
    this.countriesArray = this.countries.get('countries');

    this.purchasesWrapper = $(wrapper);
    this.salesWrapper = $(wrapper);
    this.casesWrapper = $(wrapper);

    this.listenTo(window.obEventBus, "socketMessageReceived", this.handleSocketMessage);
    this.listenTo(window.obEventBus, "orderModalClosed", function(){
      this.orderID = "";
      this.getData();
    });

    $('.js-loadingModal').removeClass("hide");
    getBTPrice(this.cCode, function(btAve){
      $('.js-loadingModal').addClass("hide");
      self.btAve = btAve;
      self.purchasesCol = new transactionsCl(null, {btAve: btAve, cCode: self.cCode});
      self.purchasesCol.url = self.serverUrl + "get_purchases";

      self.salesCol = new transactionsCl(null, {btAve: btAve, cCode: self.cCode});
      self.salesCol.url = self.serverUrl + "get_sales";

      self.casesCol = new transactionsCl(null, {btAve: btAve, cCode: self.cCode});
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
        models.length && self.setSearchList('transactionsPurchases');
        self.salesCol.fetch({
          success: function(models){
            if(self.model.get('page').vendor) {
              self.renderTab("sales", self.salesCol, self.salesWrapper);
              models.length && self.setSearchList('transactionsSales');
            }
            self.casesCol.fetch({
              success: function(models) {
                //self.renderCases();
                self.renderTab("cases", self.casesCol, self.casesWrapper);
                models.length && self.setSearchList('transactionsCases');
              },
              error: function(jqXHR, status, errorThrown){
                messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
              }
            }).always(function(){
              //if page was opened with an orderID, open that tab and open the order modal
              //find the order
              if(self.orderID){
                var tType = '';
                var orderModelP = self.purchasesCol.findWhere({ order_id: self.orderID});
                var orderModelS = self.salesCol.findWhere({ order_id: self.orderID});
                var orderModelC = self.casesCol.findWhere({ order_id: self.orderID});
                var orderModel = orderModelP || orderModelS || orderModelC;

                if(orderModelP){
                  tType = "purchases";
                  self.setState('purchases', self.orderID)
                } else if(orderModelS){
                  tType = "sales";
                  self.setState('sales', self.orderID)
                } else if(orderModelC){
                  tType = "cases";
                  self.setState('cases', self.orderID)
                }

                if(orderModel){
                  self.openOrderModal({
                    'orderID': self.orderID,
                    'status': orderModel.get('status'),
                    'transactionType': tType
                  });
                }
              }
            });
          },
          error: function(jqXHR, status, errorThrown){
            messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
          }
        });
      },
      error: function(jqXHR, status, errorThrown){
        messageModal.show(window.polyglot.t('errorMessages.getError'), "<i>" + errorThrown + "</i>");
        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if(data.notification && data.notification.order_id){
      this.getData();
    }
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

  setState: function(state, orderID){
    var addID = orderID ? "/" + orderID : "";
    this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    //add action to history
    Backbone.history.navigate("#transactions/" + state + addID);
  },

  tabHandler: function(e){
    "use strict";
    var tab = $(e.target).closest('.js-tab'),
        tabID = tab.data("tab"),
        showContent = this.$el.find('.js-'+tabID);

    this.filterBy = '';
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
        tabTarget = tab.data("tab");

    this.filterBy = tab.val();
    this.$('.js-'+tabTarget+' .search').val("");
    switch(tabTarget){
      case "purchases":
        this.renderTab("purchases", this.purchasesCol, this.purchasesWrapper);
        break;
      case "sales":
        this.renderTab("sales", this.salesCol, this.salesWrapper);
        break;
      case "cases":
        this.renderTab("cases", this.casesCol, this.casesWrapper);
        break;
    }
  },

  renderTab: function(tabName, tabCollection, tabWrapper, filterBy){
    "use strict";
    var self = this;
    filterBy = filterBy || this.filterBy;
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
    if(options.status == "open"){
      options.status = 4;
    }
    var btcRegex = window.testnet ? this.userModel.get('bitcoinValidationRegexTestnet') : this.userModel.get('bitcoinValidationRegex');
    var orderModalView = new transactionModalVw({
      orderID: options.orderID,
      status: options.status,
      serverUrl: this.serverUrl,
      parentEl: $('.js-transactionModalHolder'),
      countriesArray: this.countriesArray,
      cCode: this.userModel.get('currency_code'),
      btAve: this.btAve,
      state: this.state,
      tabState: options.tabState,
      bitcoinValidationRegex: btcRegex,
      transactionType: options.transactionType,
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView
    });
    this.registerChild(orderModalView);
  }
});