var Stream = require('stream');

module.exports = function iBooksStream(markdown) {

  if (markdown === undefined) {
    markdown = true;
  }

  var s = new Stream;
  s.writeable = true;
  s.readable = true;

  var buf = '';
  var chapter = '';

  s.write = function (data) {
    buf += data;

    var re = /(.*)^[0-9]{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) [0-9]{4}\n([^\n]+)\n(.*)/gim;

    var matches;
    var matched = false;
    while (matches = re.exec(buf)) {
      if (chapter !== matches[3]) {
        chapter = matches[3];
        s.emit('data', (markdown ? '#' : '') + 'Chapter: ' + chapter + '\n\n');
      }
      matched = true;

      if (matches[4] !== chapter) {
        s.emit('data', matches[4] + '\n\n');
      }
    }

    if (matched) {
      buf = '';
    }
  };

  s.end = function (data) {
    if (arguments.length) {
      s.write(data);
    }

    s.emit('end');
  };

  return s;
};
