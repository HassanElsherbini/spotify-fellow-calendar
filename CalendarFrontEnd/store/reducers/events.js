import axios from 'axios';

/**** ACTIONS ****/
const GET_EVENTS = 'FETCH_EVENTS';

/****ACTION CREATORS ****/
const getAllEvents = events => ({type: GET_EVENTS, payload: events});

/****THUNK CREATORS ****/
export const fetchAllEvents = () => dispatch => {
  axios.get('api/events')
  .then((res) => {
    dispatch(getAllEvents(res.data));
  })
  .catch(err => console.log(err));
};

/**** REDUCER ****/
export default function(state = [], action){
  switch (action.type){
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  }
}
