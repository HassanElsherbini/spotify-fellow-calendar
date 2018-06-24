
/**** ACTIONS ****/
const DATE_SET = 'DATE_SET';

/****ACTION CREATORS ****/
const setDate = date => ({type: DATE_SET, payload: date});

/****THUNK CREATORS ****/
export const updateSelectedDate = (date) => dispatch => {
  dispatch(setDate(date));
};

/**** REDUCER ****/
export default function(state = new Date(), action){
  switch (action.type){
    case DATE_SET:
      return action.payload;
    default:
      return state;
  }
}
