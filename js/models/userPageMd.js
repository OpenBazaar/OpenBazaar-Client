var __ = require('underscore'),
    Backbone = require('backbone'),
    is = require('is_js');

module.exports = Backbone.Model.extend({
  defaults: {
    profile: {
      guid: "",
      vendor: false,
      name: "Default Name",
      categories: ["category 1", "category 2"],
      moderator: false,
      moderators: ["moderator 1", "moderator 2"],
      shipsTo: "",
      headerhash: "",
      about: "default about text",
      website: "",
      email: "",
      social_accounts: {
        twitter: {
          username: "not provided",
          proof_url: ""
        },
        facebook: {
          username: "not provided",
          proof_url: ""
        },
        instagram: {
          username: "not provided",
          proof_url: ""
        },
        snapchat: {
          username: "not provided",
          proof_url: ""
        }
      },
      followers: ["handle1", "handle2", "handle3"],
      following: ["handle4", "handle5", "handle6"],
      contracts: ["ID1", "ID2", "ID3"],
      primary_color: "#4a4848",
      secondary_color: "#575757",
      text_color: "#fff",
      background_color: "#2a2a2a",
      pgp_key: "",
      nsfw: false,
      location: "UNITED_STATES",
      avatar_hash: "",
      handle: "",
      GUID: "",
      encryption_key: ""
    }
  },

  convertColor: function(color){
    if(is.not.hexColor(color)) {
      //convert string to a number, then to a hex string
      color = (Number(color)).toString(16);
      //if the color had leading zeroes, they were cut off. Restore them.
      while (color.length < 6){
        color = "0" + color;
      }
      color = "#" + color;
    }
    return color;
  },

  parse: function(response) {
    //check if colors are in hex, if not convert. This assumes non-hex colors are numbers or strings of numbers.
    response.profile.background_color = this.convertColor(response.profile.background_color);
    response.profile.primary_color = this.convertColor(response.profile.primary_color);
    response.profile.secondary_color = this.convertColor(response.profile.secondary_color);
    response.profile.text_color = this.convertColor(response.profile.text_color);

    return response;
  }
});
