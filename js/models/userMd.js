var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    beenSet: false, //set this back to false when done testing
    guid: "8f9c3e25c0e196647f83fa704a59c6b76f15b686", //for testing with test server only
    name: "Your Name",
    handle: "Blockchain ID",
    avatar_hash: "",
    tempAvatar: "",
    bitcoinAddress: "",
    currency: "US Dollar",
    currencyCode: "USD",
    country: "UNITED_STATES", //set to blank when done testing //this is the country code, like UNITED_STATES
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
    libbitcoinServer: "",
    SSL: false,
    seedPhrase: "",
    //values below for testing. Real value should be dynamically set
    server: "http://seed.openbazaar.org:18469/api/v1/"
    //server: "http://bitcoinauthenticator.org:18469/api/v1/"
  }
});
