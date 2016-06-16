// https://github.com/jeromegn/Backbone.localStorage

// We are wrapping the above Backbone localStorage adapter to slightly
// change its behavior. By default, it overrides Backbone.sync globally,
// forcing all models and collections to sync to localStorage (rather than rest).
// We are modifying it to leave the default sync in tact, and you can opt in on
// a per model / collection basis by setting it's sync method to
// Backbone.LocalStorage.sync. You also still need to set the localStorage attribute,
// as described in the docs.

'use strict';

var Backbone = require('backbone'),
    localStorageSync = require('backbone.localstorage'); // eslint-disable-line

Backbone.sync = Backbone.ajaxSync;
delete Backbone.ajaxSync;

module.exports = Backbone.LocalStorage;