var message;
var chatroom;
var socket;
function send() {
  if (message.length > 0) {
    socket.emit('chat', {
      message: message,
      room: chatroom,
    });
  };
};

$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/port',
    success: (res) => {
      console.log(res);
      if (res.type === 'local') {
        socket = io.connect('localhost:3000');
      } else {
        socket = io.connect('https://taylorschatapp.herokuapp.com');
      };

      $('#roomnumber').on('keydown', () => {
        $('.window').html('');
        chatroom = document.getElementById('roomnumber').value;
        console.log(chatroom);
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
        chatroom = document.getElementById('roomnumber').value;
        if (chatroom === data.room) {
          $('.window').append('<div class="message">' + data.message + '</div>');
        };
      });
    },
  });

});
