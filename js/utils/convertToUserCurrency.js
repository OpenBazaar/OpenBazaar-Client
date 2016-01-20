var __ = require('underscore'),
    Backbone = require('backbone');

/*eslint no-use-before-define:0*/
module.exports = function (priceIn, btAve, currencyCodeIn, currencyCodeOut, callback) {
    var self = this,
        priceInBTC = 0,
        inToOutBTCRatio = 0,
        priceOut = 0;

    currencyCodeIn = currencyCodeIn.toUpperCase();
    currencyCodeOut = currencyCodeOut.toUpperCase();

    priceInBTC = Number(priceIn * btAve);
    //if currencyCodeIn and currencyCodeOut are the same, multiply by one to avoid rounding errors
    inToOutBTCRatio = (currencyCodeIn == currencyCodeOut) ? 1 : window.currentBitcoin/btAve;

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
