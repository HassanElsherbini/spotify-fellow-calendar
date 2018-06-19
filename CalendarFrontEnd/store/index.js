import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import events from './reducers/events';

const rootReducer = combineReducers(
  {
    events
  }
);


const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
);

const store = createStore(rootReducer, middleware);

export default store;
export * from './reducers/events';
