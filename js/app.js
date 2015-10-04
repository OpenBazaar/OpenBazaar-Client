var __ = window.__ = require('underscore'),
    Backbone = require('backbone');
//add to global scope for non-modular libraries
window.Backbone = Backbone;
$ = require('jquery');
//add to global scope for non-modular libraries
window.$ = $;
window.jQuery = $;
Backbone.$ = $;
window.Backbone.$ = $;

var Polyglot = require('node-polyglot'),
    getBTPrice = require('./utils/getBitcoinPrice'),
    router = require('./router'),
    userModel = require('./models/userMd'),
    languagesModel = require('./models/languagesMd'),
    pageNavView = require('./views/pageNavVw');


var user = new userModel();

//put in a call to the server here to get an updated user model

var languages = new languagesModel();

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);

//every 15 minutes update the bitcoin price
setTimeout(function(){
  getBTPrice(user.get('currencyCode'), function(btAve){
    //put the current bitcoin price in the window so it doesn't have to be passed to models
    window.currentBitcoin = btAve;
  });
},54000000); //TODO: Extract magic number to config file

//get things started
getBTPrice(user.get('currencyCode'), function(btAve){
  window.currentBitcoin = btAve;
  $('.js-loadingModal').hide();
    new pageNavView({model: user});
    this.router = new router({userModel: user});
  Backbone.history.start();
});




