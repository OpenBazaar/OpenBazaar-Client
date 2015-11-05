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
      header_hash: "",
      about: "default about text",
      website: "",
      email: "",
      social_accounts: {
        twitter: {
          username: "",
          proof_url: ""
        },
        facebook: {
          username: "",
          proof_url: ""
        },
        instagram: {
          username: "",
          proof_url: ""
        },
        snapchat: {
          username: "",
          proof_url: ""
        }
      },
      followers: ["handle1", "handle2", "handle3"],
      following: ["handle4", "handle5", "handle6"],
      contracts: ["ID1", "ID2", "ID3"],
      primary_color: "#086A9E",
      secondary_color: "#317DB8",
      text_color: "#ffffff",
      background_color: "#063753",
      pgp_key: "",
      nsfw: false,
      location: "UNITED_STATES",
      avatar_hash: "",
      handle: "",
      encryption_key: ""
    }
  },

  convertColor: function(color){
    //make sure color is not truncated to a 6 digit number, that will fool is.js
    if (color[0] != "#" || is.not.hexColor(color)) {
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
    //first check to make sure server sent data in the response. Sometimes it doesn't.
    if(response.profile){
      //check if colors are in hex, if not convert. This assumes non-hex colors are numbers or strings of numbers.
      response.profile.background_color = this.convertColor(response.profile.background_color);
      response.profile.primary_color = this.convertColor(response.profile.primary_color);
      response.profile.secondary_color = this.convertColor(response.profile.secondary_color);
      response.profile.text_color = this.convertColor(response.profile.text_color);

      //if an empty social_accounts object is returned, put the defaults back into it
      response.profile.social_accounts.facebook = response.profile.social_accounts.facebook || {username: "", proof_url: ""};
      response.profile.social_accounts.twitter = response.profile.social_accounts.facebook || {twitter: "", proof_url: ""};
      response.profile.social_accounts.instagram = response.profile.social_accounts.instagram || {username: "", proof_url: ""};
      response.profile.social_accounts.snapchat = response.profile.social_accounts.snapchat || {username: "", proof_url: ""};

      //check to make sure avatar hash is valid
      if(response.profile.avatar_hash === "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" || response.profile.avatar_hash.length !== 40) {
        response.profile.avatar_hash = "";
      }
    }

    return response;
  }
});
