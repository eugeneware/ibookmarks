var filed = require('filed');
var iBooksStream = require('./lib/ibooksstream');
var concat = require('concat-stream');
var marked = require('marked');

filed(__dirname + '/test/fixtures/input.txt')
  .pipe(iBooksStream(true))
  .pipe(concat(function(err, data) {
    this.emit('data', marked(data));
    this.emit('end');
  }))
  .pipe(process.stdout);
