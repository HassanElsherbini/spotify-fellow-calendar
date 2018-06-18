const router = require('express').Router();
const Event = require('../db/models/event');

module.exports = router;

//get all calender events
router.get('/', (req, res, next) => {
  Event.find({})
  .then(events => res.json(events))
  .catch(next);
});

router.post('/', (req, res, next) => {
  let newEvent = new Event(req.body);
  newEvent.save()
  .then(event => res.json(event))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let update = req.body;

  Event.findByIdAndUpdate(id, update, {})
  .then(updatedEvent => res.json(updatedEvent))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Event.findByIdAndRemove(id)
  .then(removedEvent => res.json(removedEvent))
  .catch(next);
});

