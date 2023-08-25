import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients-slice/ingredients-slice";
import  modalReducer  from "./modal-slice/modal-slice";
import consctructorReducer from "./constructor-slice/consctructor-slice";
import userReducer from "./user-slice/user-slice";
import websockerReducer from "./websocket-slice/websocket-slice";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { wsActions } from "./websocket-slice/websocket-slice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: consctructorReducer,
    user: userReducer,
    websocket: websockerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;