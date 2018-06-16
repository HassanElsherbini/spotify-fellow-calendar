const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost/eventCalendar';

mongoose.Promise = global.Promise;
mongoose.connect(DB_URI || process.env.DB_URI);
let db = mongoose.connection;

// check connection
db.once('open', () => {
  console.log('Connected to mongodb');
});

// check for db errors
db.on('error', (err) => {
  console.log(err);
});

module.exports = db;

