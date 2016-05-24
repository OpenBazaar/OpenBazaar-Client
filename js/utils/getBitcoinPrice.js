var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    app = require('../App').getApp();

/*eslint no-use-before-define:0*/
module.exports = function (currency, callback) {
    //some APIs require currency to be upper case
    currency = currency.toUpperCase();

    var showStatus,
        btPrices = [],
        btcAverages = {rates: {}};

    //if this is the first check, show status
    if(!window.btcAverages){
        showStatus = app.statusBar.pushMessage({
            msg: window.polyglot.t('LoadingBitcoinPrices'),
            duration: false
        });
    }

    window.btcAverages = window.btcAverages || {};

    var getBTCPrices = function(){
      $.ajax({
        url: app.serverConfigs.getActive().getServerBaseUrl() + '/btc_price',
        dataType: 'json',
        cache: false //just in case
      })
      .done(function(data, textStatus, jqXHR){
        if(!__.isEmpty(data.currencyCodes)){
          btPrices.push(data.currencyCodes);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        logAPIErrorInfo("Call to btc_price", jqXHR, textStatus, errorThrown);
      })
      .always(function () {
        makeAveragePrice();
      });

    };

  if(currency == "BTC" && window.currencyKeys) {
    typeof callback === 'function' && callback(1, window.currencyKeys);
  } else if(window.btcAverages.timeStamp
        && Math.floor((new Date() - window.btcAverages.timeStamp) / 60000) < 15
        && window.currencyKeys
        && window.btcAverages.rates[currency]) {
        typeof callback === 'function' && callback(window.btcAverages.rates[currency], window.currencyKeys);
    } else {
        getBTCPrices();
    }

    var makeAveragePrice = function () {
        var sum,
            currencyPrices,
            currency_code,
            currencyKeys,
            averagePrice,
            keys = {};
        btcAverages.timeStamp = new Date();
        for (var i in btPrices) {
            if (btPrices.hasOwnProperty(i)) {
                keys = $.extend(keys, btPrices[i]);
            }
        }
        if (btPrices.length === 0) {
            console.log("Bitcoin exchange rates are not available.");
        }
        currencyKeys = Object.keys(keys);
        for (var index in currencyKeys) {
            if (currencyKeys.hasOwnProperty(index)) {
                currency_code = currencyKeys[index];
                currencyPrices = [];
                for (var j in btPrices) {
                    if (btPrices[j][currency_code]) {
                        currencyPrices.push(btPrices[j][currency_code]);
                    }
                }
                sum = 0;
                for (var jIndex in currencyPrices) {
                    if (currencyPrices.hasOwnProperty(jIndex)) {
                        sum += Number(currencyPrices[jIndex]);
                    }
                }
                averagePrice = sum / currencyPrices.length;  //TODO: Eliminate division due to floating point math
                btcAverages.rates[currency_code] = averagePrice;
            }
        }
        window.btcAverages = btcAverages;
        window.currencyKeys = currencyKeys;

        showStatus && showStatus.remove();

        if(currency != "BTC"){
          typeof callback === 'function' && callback(btcAverages.rates[currency], currencyKeys);
        } else {
          typeof callback === 'function' && callback(1, currencyKeys);
        }


        

    };

    
    function logAPIErrorInfo(APIname, jqXHR, textStatus, errorThrown)
    {
        console.log(APIname + " request failed: ");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
};
