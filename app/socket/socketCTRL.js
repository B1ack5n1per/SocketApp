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
          db.collection('rooms').updateOne(result, { $push: { messages: data.user + ': ' + data.message, } }, (err, results) => {
            io.sockets.emit('chat', data);
          });
        };
      });
    });

  });
  app.post('/getMessages', (req, res) => {
    let query = {
      number: Number(req.body.room),
    };
    console.log(query);
    db.collection('rooms').findOne(query, (err, result) => {
      if (result != null) {
        console.log(result.messages);
        res.send(result.messages);
      } else {
        console.log('fail');
        res.send(['fail']);
      };
    });
  });
  app.get('/genRoom', (req, res) => {
    let number = Math.floor(Math.random() * 100000);
    console.log(number);
    db.collection('rooms').findOne({ number: number }, (err, result) => {
      if (result === null) {
        console.log('free');
        db.collection('rooms').insert({ number: number, messages: [], }, (err, result) => {
          res.send({ number: number });
        });
      } else {
        console.log(result);
      };
    });
  });
};
