var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate'),
    itemModel = require('../models/itemMd');


module.exports = Backbone.View.extend({

    events: {

    },

    initialize: function(options){
        this.options = options || {};
        this.model.set({server: options.server});
        this.render();
    },

    render: function(){
        var self = this;
        var tmpl = loadTemplate('./js/templates/item.html', function(loadedTemplate) {
            self.$el.html(loadedTemplate(self.model.toJSON()));
        });
        return this;
    }
});