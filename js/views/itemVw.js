var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    loadTemplate = require('../utils/loadTemplate');


module.exports = Backbone.View.extend({

    events: {

    },

    initialize: function(){
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