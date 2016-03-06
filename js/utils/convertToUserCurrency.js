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
        throw new Error('No price provided');
        console.log("Convert to User Currency Failed on priceIn");
        typeof callback === 'function' && callback(0, 0, true,'No price provided');
        return;
    }
    if (!oneVendorCurrencyUnitInBTC) {
        throw new Error('No vendor currency unit value in BTC provided');
        console.log("Convert to User Currency Failed on oneVendorCurrencyUnitInBTC");
        typeof callback === 'function' && callback(0, 0, true,'No vendor currency unit value in BTC provided');
        return;
    }
    if (!currencyCodeIn) {
        throw new Error('No incoming currency code provided');
        console.log("Convert to User Currency Failed on currencyCodeIn");
        typeof callback === 'function' && callback(0, 0, true,'No incoming currency code provided');
    }
    if (!currencyCodeOut) {
        throw new Error('No outgoing currency code provided');
        console.log("Convert to User Currency Failed on currencyCodeOut");
        typeof callback === 'function' && callback(0, 0, true,'No outgoing currency code provided');
    }
    if (!currencyCodeIn) {
        throw new Error('No currency code provided');
        console.log("Convert to User Currency Failed on currencyCodeIn");
        typeof callback === 'function' && callback(0, 0, true,'No currency code provided');
    }

    console.log(currencyCodeIn)

    currencyCodeIn = currencyCodeIn.toUpperCase();
    currencyCodeOut = currencyCodeOut.toUpperCase();

    priceInBTC = (currencyCodeIn == "BTC") ? priceIn : Number(priceIn / oneVendorCurrencyUnitInBTC);
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
