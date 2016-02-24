var __ = require('underscore'),
    fs = require('fs'),
    path = require('path')
    templateHelpers = require('./templateHelpers');

module.exports = function(templateFile, callback){
  var cur_dir = path.dirname(require.main.filename),
      file = fs.readFileSync(cur_dir + path.sep + templateFile, "utf8"),
      compiledTmpl,
      wrappedTmpl;
  
  __.templateSettings.variable = "ob";
  compiledTmpl = __.template(file);

  wrappedTmpl = function(context) {
    var mergedContext = __.extend({}, templateHelpers, context || {});

    return compiledTmpl(mergedContext); 
  }
  
  callback(wrappedTmpl);
};