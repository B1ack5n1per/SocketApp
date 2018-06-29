var message;
var chatroom;
var socket;
var name;
var cookies;
function parse(str) {
  str = str.split(', ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  };

  return result;
};

function send() {
  if (message.length > 0 && name.length > 0) {
    socket.emit('chat', {
      message: message,
      room: chatroom,
      user: name,
    });
  } else if (name.length < 1) {
    $('#name').css('color', 'rgb(252, 49, 49)');
    alert('Please provide a username in the Username box below');
  };
};

$(document).ready(() => {
  if (document.cookie) {
    cookies = parse(document.cookie);
    $('#name').val(cookies.username);
  };

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

      $('#roomnumber').on('keypress', (event) => {
        console.log(event);
        chatroom = document.getElementById('roomnumber').value;
        console.log(chatroom);
        if (event.charCode === 13) {
          $.ajax({
            method: 'POST',
            url: '/getMessages',
            headers: {
              contentType: 'application/json',
            },
            data: {
              room: chatroom,
            },
            success: (res) => {
              if (res[0] != 'fail') {
                for (let i = 0; i < res.length; i++) {
                  $('.window').append('<div class="message">' + res[i] + '</div>');
                  $('#roomnumber').css('color', 'rgb(97, 255, 50)');
                };
              }
            },
          });
        } else {
          $('#roomnumber').css('color', 'rgb(252, 49, 49)');
        };
      });
      $('#roomnumber').on('keydown', () => {
        $('.window').html('');
        $('#roomnumber').css('color', 'rgb(252, 49, 49)');
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
      $('#name').on('keypress', (event) => {
        if (event.charCode === 13) {
          $('#name').css('color', 'rgb(97, 255, 50)');
          document.cookie = 'username=' + event.target.value;
          console.log(document.cookie);
        };
      });
      $('.send').on('click', () => {
        message = document.getElementById('message').value;
        name = document.getElementById('name').value;
        send();
        $('#message').val('');
      });
      $('#message').on('keypress', (event) => {
        console.log(event);
        if (event.charCode === 13) {
          message = document.getElementById('message').value;
          name = document.getElementById('name').value;
          document.cookie;
          send();
          $('#message').val('');
        };
      });
      socket.on('chat', (data) => {
        chatroom = document.getElementById('roomnumber').value;
        if (chatroom === data.room) {
          $('.window').append('<div class="message">' + data.user + ': ' + data.message + '</div>');
        };
      });
    },
  });

});
