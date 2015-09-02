var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    beenSet: true, //set this back to false when done testing
    guid: "",
    name: "Your Name",
    handle: "Blockchain ID",
    avatar_hash: "",
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
    seedPhrase: "",
    //values below for testing. Real value should be dynamically set
    server: "http://seed.openbazaar.org:18469/api/v1/"
    //server: "http://bitcoinauthenticator.org:18469/api/v1/"
  },

  initialize: function(){
    this.on('change', function(){
    })
  }
});