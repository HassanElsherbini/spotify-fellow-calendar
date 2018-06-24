/**** ACTIONS ****/
const VIEW_SET = 'VIEW_SET';

/****ACTION CREATORS ****/
const setView = view => ({type: VIEW_SET, payload: view});

/****THUNK CREATORS ****/
export const updateSelectedView = (view) => dispatch => {
  dispatch(setView(view));
};

/**** REDUCER ****/
export default function(state = 0, action){
  switch (action.type){
    case VIEW_SET:
      return action.payload;
    default:
      return state;
  }
}
