import { array, object } from "prop-types";
import { useDispatch } from "react-redux";


const constructorInitialState = {
  //bun: null,
  //ingredients: null,
  // constructorRequest: false, 
  // constructorFailed:  false,
  test: false
}


export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {

    default: {
      return state;
    }
  }
}
