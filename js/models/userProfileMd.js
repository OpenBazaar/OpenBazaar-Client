var __ = require('underscore'),
    Backbone = require('backbone'),
    is = require('is_js'),
    autolinker = require( 'autolinker' );

module.exports = Backbone.Model.extend({
  defaults: {
    profile: {
      guid: "",
      vendor: false,
      name: "",
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
      public_key: ""
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
      response.profile.social_accounts.twitter = response.profile.social_accounts.twitter || {username: "", proof_url: ""};
      response.profile.social_accounts.instagram = response.profile.social_accounts.instagram || {username: "", proof_url: ""};
      response.profile.social_accounts.snapchat = response.profile.social_accounts.snapchat || {username: "", proof_url: ""};

      //check to make sure avatar hash is valid
      if(response.profile.avatar_hash === "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" || response.profile.avatar_hash.length !== 40) {
        response.profile.avatar_hash = "";
      }

      //check to make sure header hash is valid
      if(response.profile.header_hash === "b472a266d0bd89c13706a4132ccfb16f7c3b9fcb" || response.profile.header_hash.length !== 40) {
        response.profile.header_hash = "";
      }

      response.profile.beenSet = !(!response.profile.avatar_hash && !response.profile.name && !response.profile.header_hash && !response.profile.handle);

      //if name comes back blank, set to random value
      if(!response.profile.name){
        response.profile.name = "ob" + Math.random().toString(36).slice(2);
      }

      //if no country, set to USA
      if(!response.profile.location) {
        response.profile.location = "UNITED_STATES";
      }

      //put a copy of the avatar outside of the profile object, so change events can be triggered for it
      if(response.profile.avatar_hash){
        response.avatar_hash = response.profile.avatar_hash;
      }

      //change any plain text urls in the about field into links
      response.profile.displayAbout = autolinker.link(response.profile.about, {'twitter': false, 'hashtag': false});


      //add randome number because change event is not triggered by changes inside profile
      response.fetched = Math.random();
    }

    return response;
  }
});
