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
    languages = new languagesModel(),
    server_urlLocal = localStorage.getItem("server_url") || "http://localhost:18469/api/v1/";

//set the urlRoot of the user model. Defaults to local host if not found
user.urlRoot = server_urlLocal + "settings";

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
    user.set('server_url', server_urlLocal);
    new pageNavView({model: user});
    new router({userModel: user});
    Backbone.history.start();
  },
  error: function(model, response){
    console.log("Information for user could not be loaded: " + response.statusText);
    alert("No user was found. Your server may not be working correctly. Loading using default settings.");
    $('.js-loadingModal').hide();
    user.set('server_url', server_urlLocal);
    new pageNavView({model: user});
    new router({userModel: user});
    Backbone.history.start();
  }
});






