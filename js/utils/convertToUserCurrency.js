var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    getBTCPrice = require('./getBitcoinPrice');
Backbone.$ = $;

/*eslint no-use-before-define:0*/
module.exports = function (priceIn, currencyCodeIn, currencyCodeOut, callback) {
    var self = this,
        priceInBTC = 0,
        inToOutBTCRatio = 0,
        priceOut = 0;

    var convertToOutPrice = function(){
        if(currencyCodeOut != "BTC"){
            priceOut = new Intl.NumberFormat(window.lang, {
                style: 'currency',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: currencyCodeOut
            }).format(priceInBTC*inToOutBTCRatio);
        }
        typeof callback === 'function' && callback(priceOut, priceInBTC);
    };

    currencyCodeIn = currencyCodeIn.toUpperCase();
    currencyCodeOut = currencyCodeOut.toUpperCase();

    if(currencyCodeIn != "BTC"){
        getBTCPrice(currencyCodeIn, function(btAve){
            priceInBTC = Number(priceIn / btAve);
            //if currencyCodeIn and currencyCodeOut are the same, multiply by one to avoid rounding errors
            inToOutBTCRatio = (currencyCodeIn == currencyCodeOut) ? 1 : window.currentBitcoin/btAve;
            convertToOutPrice();
        });
    } else {
        priceInBTC = priceIn;
        inToOutBTCRatio = window.currentBitcoin;
        convertToOutPrice();
    }

};
