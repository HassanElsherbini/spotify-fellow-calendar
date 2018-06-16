const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./db');

module.exports = app;

const createApp = () => {
  //http request logger middleware
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //api routes
  app.use('/api', apiRouter);
  //static file serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  //send not found any remaining static file requests
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 400;
      next(err);
    } else {
      next();
    }
  });

  //send index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  //error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

};

const startListening = () => {
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
};

createApp();
startListening();
