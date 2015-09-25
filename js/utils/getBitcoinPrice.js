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
        var BlockchainCurrencies = {};
        for (var bcCurrency in response) {
            if(response.hasOwnProperty(bcCurrency)){
            BlockchainCurrencies[bcCurrency] = response[bcCurrency]['15m'];
            }
        }
        btPrices.push(BlockchainCurrencies);
      })
      .fail(function (jqXHR, textStatus, errorThrown)
      {
        console.log("Blockchain request failed: ");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      })
      .always(function ()
      {
        callCoinkite();
      });
    };

    var callCoinkite = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://api.coinkite.com/public/rates"
      })
          .done(function (response)
          {
            var CoinkiteCurrencies = {};
            for (var ckCurrency in response.rates.BTC) {
                if(response.hasOwnProperty(ckCurrency)){
                CoinkiteCurrencies[ckCurrency] = response.rates.BTC[ckCurrency].rate;
                }
            }
            btPrices.push(CoinkiteCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("Coinkite request failed: ");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
          .always(function ()
          {
            callBitcoinAvg();
          });

    };

    var callBitcoinAvg = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://api.bitcoinaverage.com/all"
      })
          .done(function (response)
          {
            var BitcoinAvgCurrencies = {};
            for (var bcaCurrency in response) {
                if(response[bcaCurrency].averages) {
                    BitcoinAvgCurrencies[bcaCurrency] = response[bcaCurrency].averages['24h_avg'];
                }
            }
            btPrices.push(BitcoinAvgCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("Bitcoin average request failed: ");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          })
          .always(function ()
          {
            callBitcoinCharts();
          });
    };

    var callBitcoinCharts = function ()
    {
      $.ajax({
        method: "GET",
        url: "http://api.bitcoincharts.com/v1/weighted_prices.json"
      })
          .done(function (response)
          {
            response = JSON.parse(response);
            var BitcoinChartsCurrencies = {};
            for (var bccCurrency in response) {
                if(response.hasOwnProperty(bccCurrency)){
                    BitcoinChartsCurrencies[bccCurrency] = response[bccCurrency]['24h'];
                }
            }
            btPrices.push(BitcoinChartsCurrencies);
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            console.log("Bitcoin average request failed: ");
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
