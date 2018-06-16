const router = require('express').Router();

module.exports = router;

//get all events calender events
router.get('/', (req, res, next) => {
  res.send('NOT IMPLEMENTED: events list');
});

router.post('/', (req, res, next) => {
  res.send('NOT IMPLEMENTED: add event');
});

router.delete('/:id', (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete event');
});

router.put('/:id', (req, res, next) => {
  res.send('NOT IMPLEMENTED: update event');
});
