var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  url: 'https://api.bitcoinaverage.com/ticker/global/USD'
});