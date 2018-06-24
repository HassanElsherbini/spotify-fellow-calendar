import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import events from './reducers/events';
import selectedDate from './reducers/selectedDate';
import selectedView from './reducers/selectedView';

const rootReducer = combineReducers(
  {
    events,
    selectedDate,
    selectedView
  }
);


const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
);

const store = createStore(rootReducer, middleware);

export default store;
export * from './reducers/events';
export * from './reducers/selectedDate';
export * from './reducers/selectedView';
