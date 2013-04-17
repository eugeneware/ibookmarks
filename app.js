var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var director = require('director');
var filed = require('filed');
var router = new director.http.Router();

var filed = require('filed');
var iBooksStream = require('./lib/ibooksstream');
var concat = require('concat-stream');
var marked = require('marked');

router.get('/', function () {
  filed(__dirname + '/views/index.html').pipe(this.res);
});

router.get('/(css|scripts)/:filename', function (dir, filename) {
  filed(__dirname + '/public/' + dir + '/' + filename).pipe(this.res);
});

function handler(req, res) {
  router.dispatch(req, res, function (err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('File not found');
  });
}

io.set('log level', 0);

io.sockets.on('connection', function (socket) {
  socket.on('cleanup', function (data) {
    var ibooks = iBooksStream({ markdown: true, chapterLevel: 3 });

    ibooks.pipe(concat(function(err, data) {
      socket.emit('results', marked(data || ''));
    }));

    ibooks.write(data);
    ibooks.end();
  });
});

app.listen(1337);
console.log('Listening on port 1337');
