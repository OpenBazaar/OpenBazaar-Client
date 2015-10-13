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
    pageNavView = require('./views/pageNavVw'),
    user = new userModel(),
    languages = new languagesModel();

//set the urlRoot of the user model. This will default to localhost in production.
user.urlRoot = user.get('server_url') + "settings";

//put language in the window so all templates and models can reach it. It's especially important in formatting currency.
window.lang = user.get("language");

//put polyglot in the window so all templates can reach it
window.polyglot = new Polyglot({locale: window.lang});

//retrieve the object that has a matching language code
window.polyglot.extend(__.where(languages.get('languages'), {langCode: window.lang})[0]);

//every 15 minutes update the bitcoin price
/* this code is no longer needed
setTimeout(function(){

  getBTPrice(user.get('currency_code'), function(btAve){
    //put the current bitcoin price in the window so it doesn't have to be passed to models
    window.currentBitcoin = btAve;
  });
},54000000);
*/

user.fetch({
  //no id is passed, this will always be a request for the user's own profile
  success: function(model){
    $('.js-loadingModal').hide();
    new pageNavView({model: user});
    new router({userModel: user});
    Backbone.history.start();
  },
  error: function(model, response){
    console.log("Information for user could not be loaded: " + response.statusText);
    alert("loading the user settings has failed");
  }
});






