"use strict";

/**
Cross-platform home directory retriever, tested on Windows XP, Windows 8.1, Mac OSX, Linux. 
@module home-path
*/
module.exports = getHomePath;

/**
@alias module:home-path
@example
> var getHomePath = require("home-path");
> getHomePath()
'/Users/Lloyd'
*/
function getHomePath() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};
