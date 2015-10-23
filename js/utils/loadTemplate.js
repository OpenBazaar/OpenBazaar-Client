var __ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function(templateFile, callback){

  var loc = window.location.pathname;
  var cur_dir = loc.substring(0, loc.lastIndexOf(path.sep));

  fs.readFile(cur_dir + path.sep + templateFile, "utf8", function(err, ob){

    if (err) {
      throw err;
    }
    __.templateSettings.variable = "ob";
    var tmpl = __.template(ob);
    callback(tmpl);
  });
};