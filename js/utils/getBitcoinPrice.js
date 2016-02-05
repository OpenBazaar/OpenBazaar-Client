var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

/*eslint no-use-before-define:0*/
module.exports = function (currency, callback) {
    //some APIs require currency to be upper case
    currency = currency.toUpperCase();

    window.btcAverages = window.btcAverages || {};

    var btPrices = [];
    var btcAverages = {rates: {}};

    var callBlockchain = function () {
        $.ajax({
            method: "GET",
            url: "https://blockchain.info/ticker"
        })
            .done(function (response) {
                var BlockchainCurrencies = {};
                for (var bcCurrency in response) {
                    if (response.hasOwnProperty(bcCurrency)) {
                        BlockchainCurrencies[bcCurrency] = response[bcCurrency]['15m'];
                    }
                }
                btPrices.push(BlockchainCurrencies);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                logAPIErrorInfo("Blockchain", jqXHR, textStatus, errorThrown);
            })
            .always(function () {
                callCoinkite();
            });
    };

    var callCoinkite = function () {
        $.ajax({
            method: "GET",
            url: "https://api.coinkite.com/public/rates"
        })
            .done(function (response) {
                var CoinkiteCurrencies = {};
                for (var ckCurrency in response.rates.BTC) {
                    if (response.rates.BTC.hasOwnProperty(ckCurrency)) {
                        CoinkiteCurrencies[ckCurrency] = response.rates.BTC[ckCurrency].rate;
                    }
                }
                btPrices.push(CoinkiteCurrencies);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                logAPIErrorInfo("Coinkite", jqXHR, textStatus, errorThrown);
            })
            .always(function () {
                callBitcoinAvg();
            });

    };

    var callBitcoinAvg = function () {
        $.ajax({
            method: "GET",
            url: "https://api.bitcoinaverage.com/all"
        })
            .done(function (response) {
                var BitcoinAvgCurrencies = {};
                for (var bcaCurrency in response) {
                    if (response[bcaCurrency].averages) {
                        BitcoinAvgCurrencies[bcaCurrency] = response[bcaCurrency].averages['24h_avg'];
                    }
                }
                btPrices.push(BitcoinAvgCurrencies);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                logAPIErrorInfo("BitcoinAverage", jqXHR, textStatus, errorThrown);
            })
            .always(function () {
                callBitcoinCharts();
            });
    };

    var callBitcoinCharts = function () {
        $.ajax({
            method: "GET",
            url: "http://api.bitcoincharts.com/v1/weighted_prices.json"
        })
            .done(function (response) {
                response = JSON.parse(response);
                var BitcoinChartsCurrencies = {};
                for (var bccCurrency in response) {
                    if (response.hasOwnProperty(bccCurrency)) {
                        BitcoinChartsCurrencies[bccCurrency] = response[bccCurrency]['24h'];
                    }
                }
                btPrices.push(BitcoinChartsCurrencies);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                logAPIErrorInfo("Bitcoin Charts", jqXHR, textStatus, errorThrown);
            })
            .always(function () {
                makeAveragePrice();
            });
    };

    if(currency == "BTC" && window.currencyKeys) {
        typeof callback === 'function' && callback(1, window.currencyKeys);
    } else if (window.btcAverages.timeStamp
        && Math.floor((new Date() - window.btcAverages.timeStamp) / 60000) < 15
        && window.currencyKeys) {
        typeof callback === 'function' && callback(window.btcAverages.rates[currency], window.currencyKeys);
    } else {
        callBlockchain();
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
