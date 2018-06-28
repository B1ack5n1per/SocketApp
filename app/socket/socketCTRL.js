module.exports = (app, db, io) => {
  io.on('connection', (socket) => {
    console.log('Connection made');

    socket.on('chat', (data) => {
      console.log(data);
      io.sockets.emit('chat', data);
    });

  });
};
