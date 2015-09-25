var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

/*eslint no-use-before-define:0*/
module.exports = function(currency, callback){

  //some APIs require currency to be upper case
  currency = currency.toUpperCase();

  //if currency is Bitcoin, don't bother with finding the Bitcoin value
  if(currency !== 'BTC')
  {

    window.btcAverages = {};
    var btPrices = [];
    var btcAverages = {rates: {}};


    var callBlockchain = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://blockchain.info/ticker"
      })
      .done(function (response)
      {
        var blockChainCurrencies = {};
        for (var currency in response) {
        blockChainCurrencies[currency] = response[currency]['15m'];
        }
        btPrices.push(blockChainCurrencies);
      })
      .fail(function (jqXHR, textStatus, errorThrown)
      {
        console.log("blockChain request failed: ");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      })
      .always(function ()
      {
        callCoinKite();
      });
    };

    var callCoinKite = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://api.coinkite.com/public/rates"
      })
          .done(function (response)
          {
            var coinKiteCurrencies = {};
            for (var currency in response.rates.BTC) {
                coinKiteCurrencies[currency] = response.rates.BTC[currency].rate;
            }
            btPrices.push(coinKiteCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("coinKite request failed: ");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
          .always(function ()
          {
            callBitCoinAvg();
          });

    };

    var callBitCoinAvg = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://api.bitcoinaverage.com/all"
      })
          .done(function (response)
          {
            var bitCoinAvgCurrencies = {};
            for (var currency in response) {
                if(response[currency].averages) {
                    bitCoinAvgCurrencies[currency] = response[currency].averages['24h_avg'];
                }
            }
            btPrices.push(bitCoinAvgCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("Bit coin average request failed: ");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
          .always(function ()
          {
            callBitCoinCharts();
          });
    };

    var callBitCoinCharts = function ()
    {
      $.ajax({
        method: "GET",
        url: "http://api.bitcoincharts.com/v1/weighted_prices.json"
      })
          .done(function (response)
          {
            var bitCoinChartsCurrencies = {};
            for (var currency in response) {
                bitCoinChartsCurrencies[currency] = response[currency]['24h'];
            }
            btPrices.push(bitCoinChartsCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("Bit coin average request failed: ");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
          .always(function ()
          {
            makeAveragePrice();
          });
    };

    if(window.btcAverages.timeStamp && Math.floor((new Date() - window.btcAverages.timeStamp)/60000) < 15){
      typeof callback === 'function' && callback(window.btcAverages.rates[currency]);
    } else {
      callBlockchain();
    }

    var makeAveragePrice = function ()
    {
      btcAverages.timeStamp = new Date();
      var keys = {};
      for (var i in btPrices) {
        keys = $.extend(keys, btPrices[i]);
      }
      if(btPrices.length === 0){
        alert("Bitcoin exchange rates are not available.");
      }
      var currencyKeys = Object.keys(keys);
      for (var index in currencyKeys) {
        var currencyCode = currencyKeys[index];
        var currencyPrices = [];
        for (var j in btPrices) {
          if (btPrices[j][currencyCode]) {
            currencyPrices.push(btPrices[j][currencyCode]);
          }
        }
        var sum = 0;
        for (var jIndex in currencyPrices) {
          sum += Number(currencyPrices[jIndex]);
        }
        var averagePrice = sum / currencyPrices.length;
        btcAverages.rates[currencyCode] = averagePrice;
      }
      //console.log("Average is " + btAve);
      window.btcAverages = btcAverages;

      var btAve = btcAverages.rates[currency];

      typeof callback === 'function' && callback(btAve);
    };

  }else{
    typeof callback === 'function' && callback(1);
  }
};
