$(document).ready(() => {
  $('body').prepend('<nav><a href="/chat"><div id="icon">Chat</div></a> <a href="#" id="makeRoom">Make Chatroom</a></nav>');
  $('#makeRoom').on('click', () => {
    $.ajax({
      type: 'GET',
      url: '/genRoom',
      success: (res) => {
        alert('Room: ' + res.number + ' has been created');
        $('#roomnumber').val(res.number);
        $('#roomnumber').css('color', 'var(--success)');
      },
    });
  });
});
