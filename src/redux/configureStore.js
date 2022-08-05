import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import categoriesReducer from './categories/categories';
import furnitureReducer from './furnitureItems/furniture';
import orderReducer from './orders/order';

const reducer = combineReducers({
  categoriesReducer,
  furnitureReducer,
  orderReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
