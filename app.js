var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var director = require('director');
var filed = require('filed');
var router = new director.http.Router();

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
    console.log(data);
    socket.emit('results', '<b>hello</b>');
  });
});

app.listen(1337);
console.log('Listening on port 1337');
