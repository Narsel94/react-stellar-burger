import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients-slice";
import  modalReducer  from "./modal-slice";
import consctructorReducer from "./consctructor-slice";
import userReducer from "./user-slice"
import { wsOrderReducer } from "./test";
import { socketMiddlewara } from "./midlewara";
import { connect as socketConnect,
  disconnect as socketDisconnect,
  wsConnecting as socketConnecting ,
  wsOpen as socketOpen,
  wsClose as socketClose,
  wsMessage as socketMessageas,
  wsError as socketError
} from "./test";

import { TwsActionTypes } from "./midlewara";

import { TWSActions } from "./test";

const wsActions = {
  wsConnect: socketConnect,
  wsDisconnect: socketDisconnect,
  wsConnecting: socketConnecting,
  onOpen: socketOpen,
  onClose: socketClose,
  onError: socketError,
  onMessage: socketMessageas
};

const liveMiddlewara = socketMiddlewara(wsActions)

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: consctructorReducer,
    user: userReducer,
    wsOrder: wsOrderReducer
  },
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveMiddlewara)
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;