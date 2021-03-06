const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const port = process.env.PORT || 3000;
const db = require('./config/db');
var app = express();
var io = undefined;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/port', (req, res) => {
  if (port === 3000) {
    res.send({ type: 'local' });
  } else {
    res.send({ type: 'heroku' });
  };
});

app.get('/', (req, res) => {
  res.redirect('/chat');
});

MongoClient.connect(db.url, (err, database) => {
  if (err) {
    throw err;
  } else {
    var server = app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
    var io = socket(server);
    require('./app/socket/socketCTRL.js')(app, database, io);
  };
});
