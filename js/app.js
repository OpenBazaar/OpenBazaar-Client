var _ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;
var fs = require('fs'),
    router = require('./router'),
    baseView = require('./views/baseVw');

/* first things first */
var appRouter = new router();
Backbone.history.start();

/* create the views */
var base = new baseView();


