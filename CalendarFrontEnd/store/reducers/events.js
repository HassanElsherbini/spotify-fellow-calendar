import axios from 'axios';

/**** ACTIONS ****/
const EVENTS_GET = 'EVENTS_GET';
const EVENT_ADD = 'EVENT_ADD ';

/****ACTION CREATORS ****/
const getAllEvents = events => ({type: EVENTS_GET, payload: events});
const addEvent = event => ({type: EVENT_ADD, payload: event});

/****THUNK CREATORS ****/
export const fetchAllEvents = () => dispatch => {
  let events = {};
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

/**** REDUCER ****/
export default function(state = [], action){
  let payload = action.payload;
  switch (action.type){
    case EVENTS_GET:
      return payload;
    case EVENT_ADD:
      return [ ...state, payload ];
    default:
      return state;
  }
}
