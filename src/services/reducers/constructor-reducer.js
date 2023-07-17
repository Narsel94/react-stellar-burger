import { useDispatch } from "react-redux";
import { ADD_INGREDIENT } from "../actions/constructor";


const constructorInitialState = {
  bun: null,
  ingredients: []
  
}


export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:{
    // const ingredient = action.payload;
    // const ingredients =
      return {
        ...state,
        ingredients:[...state.constructor.ingredients].map(ingredient => ingredient._id === action.payload._id ? {ingredient, qty:++ingredient.qty}: ingredient)
    }}
    default: {
      return state;
    }
  }
}
