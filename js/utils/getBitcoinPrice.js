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
            msg: polyglot.t('LoadingBitcoinPrices'),
            duration: false
        });
    }

    window.btcAverages = window.btcAverages || {};

    var getBTCPrices = function(){
      $.ajax({
        url: app.serverConfig.getServerBaseUrl() + '/btc_price',
        dataType: 'json'
      })
      .done(function(data, textStatus, jqXHR){
        btPrices.push(data.currencyCodes);
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
    } else {
        getBTCPrices();
    }

    var makeAveragePrice = function () {
        var sum,
            currencyPrices,
            currency_code,
            currencyKeys,
            averagePrice,
            keys = {},
            btAve;
        btcAverages.timeStamp = new Date();
        for (var i in btPrices) {
            if (btPrices.hasOwnProperty(i)) {
                keys = $.extend(keys, btPrices[i]);
            }
        }
        if (btPrices.length === 0) {
            alert("Bitcoin exchange rates are not available.");
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
        if(currency != "BTC"){
            btAve = btcAverages.rates[currency];
        } else {
            btAve = 1;
        }

        showStatus && showStatus.remove();
        
        typeof callback === 'function' && callback(btAve, currencyKeys);
    };

    
    function logAPIErrorInfo(APIname, jqXHR, textStatus, errorThrown)
    {
        console.log(APIname + " request failed: ");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
};
