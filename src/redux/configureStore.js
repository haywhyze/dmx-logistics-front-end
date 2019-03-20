import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Orders from './orders';
import Users from './users';

export default () => {
  const store = createStore(
    combineReducers({
      orders: Orders,
      users: Users,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};
