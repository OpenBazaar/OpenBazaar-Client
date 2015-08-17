var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    router = require('./router'),
    pageNavView = require('./views/pageNavVw');

/* first things first */

var appRouter = new router();
Backbone.history.start();

/* create the views */
var pageNav = new pageNavView();


