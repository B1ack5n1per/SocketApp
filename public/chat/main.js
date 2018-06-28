var socket = io.connect('http://localhost:3000');
var message;

function send() {
  message = document.getElementById('message').value;
  socket.emit('chat', {
    message: message,
  });
};

$(document).ready(() => {
  $('.send').on('mousedown', () => {
    $('.send').css('background', 'rgb(39, 49, 119)');
  });
  $('.send').on('mouseup', () => {
      $('.send').css('background', 'rgb(76, 55, 207)');
    });
  $('.send').on('click', () => {
    send();
  });
  socket.on('chat', (data) => {
    $('.window').append('<div class="message">' + data.message + '</div>');
  });
});
