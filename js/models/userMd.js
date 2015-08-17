Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    beenSet: false,
    firstName: "New",
    lastName: "User",
    avatar_hash: "",
    tempAvatar: "",
    currency: "",
    country: "",
    timeZome: "",
    handle: "No Handle Set"
  },

  initialize: function(){
    console.log("user initialized");
    this.on('change', function(){
      console.log("user has changed values");
    })
  }
});