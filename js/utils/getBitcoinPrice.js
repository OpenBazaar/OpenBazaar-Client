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

    var btPrices = [];

    //initial call
    //bitcoin average is hitting the rate limit
    /*
  $.ajax({
    method: "GET",
    url: "https://api.bitcoinaverage.com/ticker/global/" + currency
  })
      .done(function (response)
      {
        //console.log("bitcoinAverage: " + response['24h_avg']);
        if($.isNumeric(response['24h_avg'])) {
          btPrices.push(response['24h_avg']);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown)
      {
        //console.log("bitcoinAverage request failed:");
        //console.log(jqXHR);
        //console.log(textStatus);
        //console.log(errorThrown);
      })
      .always(function ()
      {
        callCoindesk();
      });

  var callCoindesk = function ()
  {*/
      $.ajax({
        method: "GET",
        dataType: "json",
        url: "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json"
      })
          .done(function (response)
          {
            //console.log("coinDesk: " + response.bpi[currency]['rate']);
            if($.isNumeric(response.bpi[currency].rate)) {
              btPrices.push(response.bpi[currency].rate);
            }
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            //console.log("coinDesk request failed:");
            //console.log(jqXHR);
            //console.log(textStatus);
            //console.log(errorThrown);
          })
          .always(function ()
          {
            callBlockchain();
          });
    //};


    var callBlockchain = function ()
    {
      $.ajax({
        method: "GET",
        url: "https://blockchain.info/ticker"
      })
          .done(function (response)
          {
            //console.log("blockChain: " + response[currency]['15m']);
            if($.isNumeric(response[currency]['15m'])) {
              btPrices.push(response[currency]['15m']);
            }
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            //console.log("blockChain request failed: ");
            //console.log(jqXHR);
            //console.log(textStatus);
            //console.log(errorThrown);
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
            //console.log("coinKite: " + response.rates.BTC[currency]['rate']);
            if ($.isNumeric(response.rates.BTC[currency].rate)) {
              btPrices.push(response.rates.BTC[currency].rate);
            }
          })
          .fail(function (jqXHR, textStatus, errorThrown)
          {
            //console.log("coinKite request failed: ");
            //console.log(jqXHR);
            //console.log(textStatus);
            //console.log(errorThrown);
          })
          .always(function ()
          {
            makeAveragePrice();
          });
    };


    var makeAveragePrice = function ()
    {
      var sum = 0,
          btAve = 0;
      for (var i = 0; i < btPrices.length; i++)
      {
        sum = sum + Number(btPrices[i]);
      }
      btAve = sum/btPrices.length;

      if(btPrices.length === 0){
        alert("Bitcoin exchange rates are not available.");
      }
      //console.log("Average is " + btAve);

      typeof callback === 'function' && callback(btAve);
    };

  }else{
    typeof callback === 'function' && callback(1);
  }
};
