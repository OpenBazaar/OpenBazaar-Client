"use strict";

var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    app = require('../App.js').getApp(),
    setTheme = require('../utils/setTheme.js'),
    Papa = require('papaparse'),
    transactionsCl = require('../collections/transactionsCl'),
    pageVw = require('./pageVw'),
    orderShortVw = require('./orderShortVw'),
    getBTPrice = require('../utils/getBitcoinPrice'),
    transactionModalVw = require('./transactionModalVw'),
    countriesMd = require('../models/countriesMd');

module.exports = pageVw.extend({

  className: "transactionsView contentWrapper",

  events: {
    'click .js-purchasesTab': 'tabHandler',
    'click .js-salesTab': 'tabHandler',
    'click .js-casesTab': 'tabHandler',
    'change .js-transactionFilter': 'transactionFilter',
    'keyup .search': 'searchKeyup',
    'click .js-transactionsSearchClear': 'searchClearClick',
    'click .js-downloadCSV': 'clickDownloadCSV',
    'change .js-toggleUnpaid': 'toggleUnpaid'
  },

  cacheExpires: 0,

  initialize: function(options){
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
    this.tabState = options.tabState;
    this.userModel = options.userModel;
    this.userProfile = options.userProfile;
    this.model = new Backbone.Model();
    this.model.set("user", options.userModel.toJSON());
    this.model.set("page", profile);
    this.socketView = options.socketView;
    setTheme(profile.primary_color, profile.secondary_color, profile.background_color, profile.text_color);
    this.serverUrl = options.userModel.get('serverUrl');
    this.cCode = options.userModel.get('currency_code');
    this.listenTo(window.obEventBus, "openOrderModal", function(options){
      self.openOrderModal(options);
    });
    this.filterBy = ''; //used for filtering the collections
    this.currentExportData = []; //used for export to CSV data

    this.countries = new countriesMd();
    this.countriesArray = this.countries.get('countries');

    this.purchasesWrapper = $(wrapper);
    this.salesWrapper = $(wrapper);
    this.casesWrapper = $(wrapper);

    //set local variables if they are not set
    if (localStorage.getItem('showUnpaid_purchases') !== "true"){
      localStorage.setItem('showUnpaid_purchases', "false");
    }
    if (localStorage.getItem('showUnpaid_sales') !== "true"){
      localStorage.setItem('showUnpaid_sales', "false");
    }

    this.listenTo(window.obEventBus, "socketMessageReceived", this.handleSocketMessage);

    app.loadingModal.open();

    getBTPrice(this.cCode, function(btAve){
      app.loadingModal.close();

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
    var self = this;

    this.purchasesCol.fetch({
      success: function(){
        self.renderTab("purchases");
        self.salesCol.fetch({
          success: function(){
            self.renderTab("sales");
            self.casesCol.fetch({
              success: function() {
                self.renderTab("cases");
              },
              error: function(jqXHR, status, errorThrown){
                app.simpleMessageModal.open({
                  title: window.polyglot.t('errorMessages.getError'),
                  message: '<i>' + errorThrown + '</i>'
                });

                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
              }
            }).always(function(){
              //if page was opened with an orderID, open that tab and open the order modal
              //find the order
              if (self.orderID){
                var tType = '';
                var orderModelP = self.purchasesCol.findWhere({ order_id: self.orderID});
                var orderModelS = self.salesCol.findWhere({ order_id: self.orderID});
                var orderModelC = self.casesCol.findWhere({ order_id: self.orderID});
                var orderModel = orderModelP || orderModelS || orderModelC;

                if (orderModelP){
                  tType = "purchases";
                  self.setState('purchases', self.orderID);
                } else if (orderModelS){
                  tType = "sales";
                  self.setState('sales', self.orderID);
                } else if (orderModelC){
                  tType = "cases";
                  self.setState('cases', self.orderID);
                }

                if (orderModel){
                  self.openOrderModal({
                    'orderID': self.orderID,
                    'status': orderModel.get('status'),
                    'transactionType': tType,
                    'tabState': self.tabState
                  });
                }
              }
            });
          },
          error: function(jqXHR, status, errorThrown){
            app.simpleMessageModal.open({
              title: window.polyglot.t('errorMessages.getError'),
              message: '<i>' + errorThrown + '</i>'
            });

            console.log(jqXHR);
            console.log(status);
            console.log(errorThrown);
          }
        });
      },
      error: function(jqXHR, status, errorThrown){
        app.simpleMessageModal.open({
          title: window.polyglot.t('errorMessages.getError'),
          message: '<i>' + errorThrown + '</i>'
        });

        console.log(jqXHR);
        console.log(status);
        console.log(errorThrown);
      }
    });
  },

  handleSocketMessage: function(response) {
    var data = JSON.parse(response.data);
    if (data.notification && data.notification.order_id){
      this.getData();
    } else if (data.message && data.message.subject){
      this.getData();
    }
  },

  render: function(){
    var self = this;
    loadTemplate('./js/templates/transactions.html', function(loadedTemplate) {
      self.$el.html(
          loadedTemplate(
            __.extend({}, self.model.toJSON(), {
              showUnpaid_purchases: localStorage.getItem('showUnpaid_purchases'),
              showUnpaid_sales: localStorage.getItem('showUnpaid_sales')
            })
        )
      );
      self.setState(self.state);
      self.getData();
    });
  },

  setTab: function(activeTab, showContent){
    this.$el.find('.js-tab').removeClass('active');
    activeTab.addClass('active');
    this.$el.find('.js-tabTarg').addClass('hide');
    showContent.removeClass('hide');
  },

  setState: function(state, orderID){
    var addID = orderID ? "/" + orderID : "";
    this.setTab(this.$el.find('.js-' + state + 'Tab'), this.$el.find('.js-' + state));
    this.state = state;
    //add action to history
    Backbone.history.navigate("#transactions/" + state + addID, { replace: true });
  },

  tabHandler: function(e){
    var tab = $(e.target).closest('.js-tab'),
        tabID = tab.data("tab");

    this.filterBy = '';
    this.setState(tabID);
  },

  searchKeyup: function(e){
    $(e.target).closest('.js-tabTarg').find('.js-transactionsSearchClear').removeClass('hide');
  },

  searchClearClick: function(e){
    this.searchClear($(e.target).closest('.js-tabTarg'));
  },

  searchClear: function($targ){
    $targ.find('.search').val("")
        .end().find('.js-transactionsSearchClear').addClass('hide');
    this['searchTransactions_'+this.state] && this['searchTransactions_'+this.state].search();
  },

  transactionFilter: function(e){
    var searchBy = $(e.target).val();

    this.filterBy = searchBy;

    if (searchBy == 'dateNewest' || searchBy == 'dateOldest'){
      this.$('.js-'+this.state+' .search').val("");
      this.renderTab(this.state);
    } else if (searchBy != "all"){
      this['searchTransactions_'+this.state] && this['searchTransactions_'+this.state].filter(function(item) {
        return item.values().js_searchStatusNum == searchBy;
      });
    } else {
      this['searchTransactions_'+this.state] && this['searchTransactions_'+this.state].filter();
    }
  },

  toggleUnpaid: function(e){
    var unpaidBtn = $(e.target),
        tabTarget = unpaidBtn.data("tab");

    if (localStorage.getItem('showUnpaid_'+tabTarget) == "true"){
      localStorage.setItem('showUnpaid_'+tabTarget, "false");
      this[tabTarget + "Wrapper"].addClass("hideChildren");
    } else {
      localStorage.setItem('showUnpaid_'+tabTarget, "true");
      this[tabTarget + "Wrapper"].removeClass("hideChildren");
    }
  },

  renderTab: function(tabName, filterBy){
    var self = this,
        tabCollection = this[tabName + "Col"],
        tabWrapper = this[tabName + "Wrapper"];

    filterBy = filterBy || this.filterBy;
    tabWrapper.html('');
    if (localStorage.getItem('showUnpaid_'+tabName) == "true"){
      tabWrapper.removeClass("hideChildren");
    } else {
      tabWrapper.addClass("hideChildren");
    }

    if (!filterBy || filterBy == "all"){
      tabCollection.comparator = function(model) {
        //order the collection so items that are unread or have status updates are first
        var status = model.get("status"),
            flagStatus = false;

        //only use the status_changed if the status matters to that tab
        if (tabName == "purchases"){
          flagStatus = status == 2 || status > 3;
        } else if (tabName == "sales") {
          flagStatus = status == 1 || status > 2;
        } else {
          flagStatus = true;
        }

        var attentionVal = model.get("unread") > 0 || model.get("status_changed") && flagStatus ? "2" : "1";
        return -(String(attentionVal) + model.get("timestamp"));
      };
      tabCollection.sort();
    }
    if (filterBy == "dateNewest"){
      tabCollection.comparator = function(model) {
        return -model.get("timestamp");
      };
      tabCollection.sort();
    }
    if (filterBy == "dateOldest"){
      tabCollection.comparator = function(model) {
        return model.get("timestamp");
      };
      tabCollection.sort();
    }
    tabCollection.each(function(model){
      self.addTransaction(model, tabWrapper, tabName);
    });

    this.$('.js-'+tabName+'Count').html(tabCollection.length);

    this.$('.js-' + tabName)
        .append(tabWrapper)
        .find('.js-unpaidCount').html(tabCollection.where({status: 0}).length)
        .end().find('.js-loadingMsg').addClass('hide');

    if (!tabCollection.length) {
      this.$('.js-' + tabName + ' .js-emptyMsg').removeClass('hide');
    } else {
      //if the tab is hidden because they have turned off their store or moderator status, but it has transactions, unhide it
      this.$('.js-'+tabName+"Tab").removeClass('hide');
    }

    if (!tabWrapper.children().length){
      //if no transactions are visible, clear the search cache, or it will show old items as results
      this['searchTransactions_'+tabName] && this['searchTransactions_'+tabName].size() && this['searchTransactions_'+tabName].clear();
    } else {
      if (this['searchTransactions_'+tabName]){
        this['searchTransactions_'+tabName].reIndex();
        if (filterBy && filterBy != "all" && filterBy != "dateNewest" && filterBy != "dateOldest") {
          //re-filter the list with new elements
          this['searchTransactions_'+tabName].filter(function (item) {
            return item.values().js_searchStatusNum == filterBy;
          });
        }
      } else {
        this['searchTransactions_'+tabName] = new window.List('transactions' + tabName.charAt(0).toUpperCase() + tabName.substr(1), {valueNames: ['js-searchOrderID', 'js-searchPrice', 'js-searchUser', 'js-searchStatus', 'js-searchTitle', 'js_searchStatusNum'], page: 1000});
      }
    }
    //clear any search text and hide the button
    this.searchClear(this.$('.js-'+tabName));
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

  clickDownloadCSV: function(e){
    var targBtn = $(e.target);
    targBtn.closest('.btn').addClass('loading');
    this.downloadCSV().always(()=> {
      targBtn && targBtn.removeClass('loading');
    });
  },

  downloadCSV: function(){
    var rawData = [],
        calls = [],
        exportData = function(data){
          var dataCSV = Papa.unparse(data),
              dataBlob = new Blob([dataCSV], {'type': 'application\/octet-stream'}), // eslint-disable-line
              tempAnchor = document.createElement('a'),
              saveDate = new Date();

          tempAnchor.href = window.URL.createObjectURL(dataBlob);
          tempAnchor.download = ('export_'+saveDate.toLocaleString(window.lang)+'.csv').replace(/,/g, '_');
          tempAnchor.click();
        };

    //clear existing data
    this.currentExportData = [];

    switch (this.state){
    case "purchases":
      rawData = this.purchasesCol.toJSON();
      break;
    case "sales":
      rawData = this.salesCol.toJSON();
      break;
    case "cases":
      rawData = this.casesCol.toJSON();
      break;
    }

    $.each(rawData, (i, transaction)=> {
      //if filter is active, don't process transactions of a different type
      if (Number.isInteger(Number(this.filterBy)) && transaction.status != this.filterBy) return;

      transaction.status = window.polyglot.t('transactions.OrderStatus'+transaction.status);
      transaction.timestamp = new Date(transaction.timestamp * 1000);
      transaction.currency_code = transaction.cCode;
      transaction.fiat_price = transaction.displayPrice;
      transaction = __.omit(transaction, "thumbnail_hash", "btAve", "imageUrl", "order_date", "cCode", "displayPrice", "vendor", "transactionType");
      calls.push(this.getTransactionData(transaction.order_id, transaction));
    });

    return $.when.apply(null, calls)
        .fail(function(){
          app.simpleMessageModal.open({
            title: window.polyglot.t('errorMessages.getError'),
            message: window.polyglot.t('errorMessages.serverError')
          });

          calls.forEach(call => {
            call.abort();
          });
        })
        .done(()=>{
          if (calls.length > 0){
            exportData(this.currentExportData);
          } else {
            app.simpleMessageModal.open({
              title: window.polyglot.t('errorMessages.noData')
            });
          }
        });
  },

  getTransactionData: function(orderID, dataObject){
    dataObject = dataObject || {};

    var getCall = $.getJSON(this.serverUrl + 'get_order', {'order_id': orderID}, (data)=> {
      //add blank data so first object has all the columns
      dataObject.quantity = '';
      dataObject.shipping_address = '';
      dataObject.payment_amount = '';
      dataObject.payment_address = '';
      dataObject.refund_tx_fee = '';
      dataObject.chaincode = '';
      dataObject.redeem_script = '';
      dataObject.refund_address = '';
      dataObject.moderator_name = '';
      dataObject.moderator_guid = '';
      dataObject.moderator_fee = '';
      dataObject.return_policy = '';

      //format and add flat data to the object
      if (data.buyer_order){
        var dPayment = data.buyer_order.order.payment;

        dataObject.quantity = data.buyer_order.order.quantity;
        if (data.buyer_order.order.shipping){
          var dShipping = data.buyer_order.order.shipping;
          dataObject.shipping_address = dShipping.ship_to + " " + dShipping.address +", " + dShipping.city + ", " + dShipping.state + ", " + dShipping.postal_code + ", " + dShipping.order + ", " + dShipping.country;
        }
        dataObject.payment_amount = dPayment.amount;
        dataObject.payment_address = dPayment.address;
        dataObject.refund_tx_fee = dPayment.refund_tx_fee || "";
        dataObject.chaincode = dPayment.chaincode || "";
        dataObject.redeem_script = dPayment.redeem_script || "";
        dataObject.refund_address = data.buyer_order.order.refund_address;

        if (data.buyer_order.order.moderator) {
          var matchedModerator = data.vendor_offer.listing.moderators.filter(function (moderator) {
            return moderator.guid == data.buyer_order.order.moderator;
          });
          dataObject.moderator_name = matchedModerator[0].name;
          dataObject.moderator_guid = matchedModerator[0].guid;
          dataObject.moderator_fee = matchedModerator[0].fee;
        }

      }

      if (data.vendor_offer.policy){
        dataObject.return_policy = data.vendor_offer.policy.returns;
      }

      this.currentExportData.push(dataObject);
    });

    return getCall;
  },

  openOrderModal: function(options){
    app.loadingModal.open({ insideApp: true });

    if (options.status == "open"){
      options.status = 4;
    }

    this.orderModalView && this.orderModalView.remove();
    this.orderModalView = new transactionModalVw({
      orderID: options.orderID,
      status: options.status,
      serverUrl: this.serverUrl,
      countriesArray: this.countriesArray,
      cCode: this.userModel.get('currency_code'),
      btAve: this.btAve,
      state: this.state,
      tabState: options.tabState,
      transactionType: options.transactionType,
      userModel: this.userModel,
      userProfile: this.userProfile,
      socketView: this.socketView,
      unread: options.unread
    }).on('loaded', () => {
      app.loadingModal.close();
      this.orderModalView.render().open();
    }).on('close', () => {
      this.orderID = '';
      this.getData();
      this.orderModalView.remove();
    });

    this.registerChild(this.orderModalView);
  }
});
