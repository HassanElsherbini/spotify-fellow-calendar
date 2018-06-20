import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import events from './reducers/events';
import currentDate from './reducers/currentDate';

const rootReducer = combineReducers(
  {
    events,
    currentDate
  }
);


const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
);

const store = createStore(rootReducer, middleware);

export default store;
export * from './reducers/events';
export * from './reducers/currentDate';
