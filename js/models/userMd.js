Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    beenSet: false, //set this back to false when done testing
    name: "Your Name",
    handle: "Blockchain ID",
    avatar_hash: "imgs/defaultUser.png",
    tempAvatar: "",
    bitcoinAddress: "",
    currency: "US Dollar",
    currencyCode: "USD",
    country: "",
    language: "en",
    timeZome: "",
    notifications: true,
    shipToName: "",
    shipToStreet: "",
    shipToCity: "",
    shipToState: "",
    shipToPostalCode: "",
    shipToCountry: "",
    blocked: ["handle1", "handle2", "handle3"],
    server: "",
    libbitcoinServer: "",
    SSL: false,
    seedPhrase: ""
  },

  initialize: function(){
    this.on('change', function(){
    })
  }
});