var __ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function(templateFile, callback){

  var cur_dir = path.dirname(require.main.filename);
  fs.readFile(cur_dir + path.sep + templateFile, "utf8", function(err, ob){

    if (err) {
      throw err;
    }
    __.templateSettings.variable = "ob";
    var tmpl = __.template(ob);
    callback(tmpl);
  });
};