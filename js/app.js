var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    Polyglot = require('node-polyglot'),
    loadTemplate = require('./utils/loadTemplate'),
    router = require('./router'),
    userModel = require('./models/userMd'),
    languagesModel = require('./models/languagesMd'),
    pageNavView = require('./views/pageNavVw'),
    currentBitcoinModel = require('./models/currentBitcoinMd');


var user = new userModel();

//put in a call to the server here to get an updated user model

var languages = new languagesModel();

//put language in the window so all templates and models can reach it
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
polyglot.extend(_.where(languages.get('languages'), {langCode: window.lang})[0]);

var currentBitcoin = new currentBitcoinModel();
currentBitcoin.url = "https://api.bitcoinaverage.com/ticker/global/"+user.get('currencyCode');

var setBitcoin = function(callback){
    //put currentBitcoin into the window so we don't have to pipe it into each model
    currentBitcoin.fetch({
      success: function(){
        window.currentBitcoin = currentBitcoin.get('24h_avg');
        typeof callback === 'function' && callback();
    },
      error: function(){
        alert("Connect Error: Current Price of Bitcoin Not Available");
        typeof callback === 'function' && callback();
    }});
};

//every 15 minutes update the bitcoin price
setTimeout(function(){
    setBitcoin();
},54000000);

//get things started
setBitcoin(function(){
    var pageNav = new pageNavView({model: user});
    this.router = new router({userModel: user});
    Backbone.history.start();
});




