var __ = require('underscore');
var fs = require('fs');

module.exports = function(templateFile, callback){

  fs.readFile(templateFile, "utf8", function(err, data){
    if (err) {
      throw err;
    }
    var tmpl = __.template(data);
    callback(tmpl);
  });
}
