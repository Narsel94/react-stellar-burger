import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients-slice";
import  modalReducer  from "./modal-slice";
import consctructorReducer from "./consctructor-slice";
import userReducer from "./user-slice"


export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: consctructorReducer,
    user: userReducer
  }
})