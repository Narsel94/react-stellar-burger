import { configureStore, applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients-slice";
import  modalReducer  from "./modal-slice";
import consctructorReducer from "./consctructor-slice";
import userReducer from "./user-slice";
import websockerReducer from "./websocket-slice";
import { socketMiddlewara } from "./middleware/websocket-middleware";
import { wsActions } from "./websocket-slice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: consctructorReducer,
    user: userReducer,
    websocket: websockerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddlewara(wsActions)),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;