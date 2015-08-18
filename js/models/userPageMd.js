Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    GUID: "",
    active: true,
    categories: ["category 1", "category 2"],
    moderators: ["moderator 1", "moderator 2"],
    shipsTo: "",
    bannerImg: "imgs/defaultBanner.png",
    about: "default about text",
    website: "",
    email: "",
    facebook: "",
    twitter: "",
    instagram: "",
    followers: ["handle1", "handle2", "handle3"],
    following: ["handle4", "handle5", "handle6"],
    customization: "",
    contracts: ["ID1", "ID2", "ID3"]
  }
});