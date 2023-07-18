import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients-slice";
import  modalReducer  from "./modal-slice";
// import constructorReducer from "./consctructor-slice";


export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    // constructor: constructorReducer
  }
})