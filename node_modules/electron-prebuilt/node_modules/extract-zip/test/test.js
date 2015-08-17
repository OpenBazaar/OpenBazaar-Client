var os = require('os')
var path = require('path')
var rimraf = require('rimraf')
var extract = require('../')

var source = path.join(__dirname, 'cats.zip')
var target = path.join(os.tmpdir(), 'cat-extract-test')
rimraf.sync(target)

console.log('extracting to', target)

extract(source, {dir: target}, function(err, results) {
  console.log('FIN', err, results)
})
