const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const { PORT = 8080 } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Phone = mongoose.model('Phone', {
  id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const dbUrl =
  'mongodb+srv://admin:admin@cluster1.z6vyc.mongodb.net/phones?retryWrites=true';

app.get('/phones', (req, res) => {
  try {
    Phone.find({}, (err, phones) => {
      res.send(phones);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/phones', (req, res) => {
  try {
    const phone = new Phone(req.body);
    phone.save((err) => {
      io.emit('phone', phone);
      res.sendStatus(200);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

io.on('connection', () => {
  console.log('a user is connected');
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected', err);
});

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
