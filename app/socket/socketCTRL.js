module.exports = (app, db, io) => {
  io.on('connection', (socket) => {
    console.log('Connection made');

    socket.on('chat', (data) => {
      console.log(data);
      let query = {
        number: Number(data.room),
      };
      console.log(query);
      db.collection('rooms').findOne(query, (err, result) => {
        console.log(result);
        if (result != null) {
          io.sockets.emit('chat', data);
        };
      });
    });

  });
  app.get('/genRoom', (req, res) => {
    let number = Math.floor(Math.random() * 100000);
    console.log(number);
    db.collection('rooms').findOne({ number: number }, (err, result) => {
      if (result === null) {
        console.log('free');
        db.collection('rooms').insert({ number: number }, (err, result) => {
          res.send({ number: number });
        });
      } else {
        console.log(result);
      };
    });
  });
};
