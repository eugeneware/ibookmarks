jQuery(function ($) {
  var socket = io.connect(document.location.origin);
  socket.on('results', function (data) {
    $('#results').html(data);
  });

  $('#cleanup').click(function () {
    socket.emit('cleanup', $('#bookmarks').val());
  });
});
