const router = require('express').Router();
const eventsRouter = require('./events');
module.exports = router;

router.use('./events', eventsRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
