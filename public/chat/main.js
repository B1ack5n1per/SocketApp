var socket = io.connect('https://taylorschatapp.herokuapp.com');
var message;
var chatroom;
function send() {
  if (message.length > 0) {
    socket.emit('chat', {
      message: message,
      room: chatroom,
    });
  };
};

$(document).ready(() => {
  $('#roomnumber').on('keydown', () => {
    $('.window').html('');
    chatroom = document.getElementById('roomnumber').value;
  });
  $('#message').on('keydown', () => {
    message = document.getElementById('message').value;
  });
  $('.send').on('mousedown', () => {
    $('.send').css('background', 'rgb(39, 49, 119)');
  });
  $('.send').on('mouseup', () => {
    $('.send').css('background', 'rgb(76, 55, 207)');
  });
  $('.send').on('click', () => {
    message = document.getElementById('message').value;
    send();
    $('#message').val('');
  });
  socket.on('chat', (data) => {
    if (chatroom === data.room) {
      $('.window').append('<div class="message">' + data.message + '</div>');
    };
  });
});
