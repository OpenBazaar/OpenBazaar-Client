var __ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function(templateFile, callback){

  var cur_dir = path.dirname(require.main.filename);
  var file = fs.readFileSync(cur_dir + path.sep + templateFile, "utf8");
  __.templateSettings.variable = "ob";
  callback(__.template(file));
};