import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredints-reducer';
import { constructorReducer } from './constructor-reducer';
import { modalReducer } from './modal-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  modal: modalReducer

});