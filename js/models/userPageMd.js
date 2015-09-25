var __ = require('underscore'),
    Backbone = require('backbone');

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
  }
});
