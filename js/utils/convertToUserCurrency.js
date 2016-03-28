var __ = require('underscore'),
    Backbone = require('backbone');

/*eslint no-use-before-define:0*/
module.exports = function (priceIn, oneVendorCurrencyUnitInBTC, currencyCodeIn, currencyCodeOut, callback) {
    var self = this,
        priceInBTC = 0,
        inToOutBTCRatio = 0,
        priceToFormat = 0,
        priceOut = 0;

    if (!priceIn) {
        throw new Error('Convert to User Currency Failed on priceIn');
    }
    if (!oneVendorCurrencyUnitInBTC) {
        throw new Error('Convert to User Currency Failed on oneVendorCurrencyUnitInBTC');
    }
    if (!currencyCodeIn) {
        throw new Error('Convert to User Currency Failed on currencyCodeIn');
    }
    if (!currencyCodeOut) {
        throw new Error('Convert to User Currency Failed on currencyCodeOut');
    }
    if (!currencyCodeIn) {
        throw new Error('Convert to User Currency Failed on currencyCodeIn');
    }

    currencyCodeIn = currencyCodeIn.toUpperCase();
    currencyCodeOut = currencyCodeOut.toUpperCase();

    priceInBTC = (currencyCodeIn == "BTC") ? Number(priceIn) : Number(priceIn / oneVendorCurrencyUnitInBTC);
    inToOutBTCRatio = (currencyCodeIn == currencyCodeOut) ? 1 : window.currentBitcoin/oneVendorCurrencyUnitInBTC;
    priceToFormat = (currencyCodeIn == currencyCodeOut) ? priceIn : priceInBTC*inToOutBTCRatio;

    if(currencyCodeOut != "BTC"){
        priceOut = new Intl.NumberFormat(window.lang, {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currency: currencyCodeOut
        }).format(priceToFormat);
    }
    typeof callback === 'function' && callback(priceOut, priceInBTC, false, '');
};
