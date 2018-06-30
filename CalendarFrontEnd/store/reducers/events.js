import axios from 'axios';

/**** ACTIONS ****/
const EVENTS_GET = 'EVENTS_GET';
const EVENT_ADD = 'EVENT_ADD ';
const EVENT_EDIT = 'EVENT_UPDATE';
const EVENT_DELETE = 'EVENT_DELETE';
/****ACTION CREATORS ****/
const getAllEvents = events => ({type: EVENTS_GET, payload: events});
const addEvent = event => ({type: EVENT_ADD, payload: event});
const editEvent = event => ({type: EVENT_EDIT, payload: event});
const deleteEvent = eventId => ({type: EVENT_DELETE, payload: eventId});

/****THUNK CREATORS ****/
export const fetchAllEvents = () => dispatch => {
  axios.get('api/events')
  .then((res) => {
    dispatch(getAllEvents(res.data));
  })
  .catch(err => console.log(err));
};

export const createEvent = (event) => dispatch => {
  axios.post('/api/events', event)
  .then(res => {
    dispatch(addEvent(res.data));
  })
  .catch(err => console.log(err));
};

export const updateEvent = (event) => dispatch => {
  axios.put(`/api/events/${event._id}`, event)
  .then((res) => {
    dispatch(editEvent(res.data));
  })
  .catch(err => console.log(err));
};

export const removeEvent = (eventId) => dispatch => {

  axios.delete(`/api/events/${eventId}`)
  .then((res) => {
    dispatch(deleteEvent(res.data._id));
  })
  .catch(err => console.log(err));
};

function filterevents (events, id){
  return events.filter(event => event._id !== id);
}
/**** REDUCER ****/
export default function(state = [], action){
  let payload = action.payload;

  switch (action.type){
    case EVENTS_GET:
      return payload;
    case EVENT_ADD:
      return [ ...state, payload ];
    case EVENT_EDIT:
      return [ ...filterevents(state, payload._id), payload ];
    case EVENT_DELETE:
      return filterevents(state, payload);
    default:
      return state;
  }
}
