import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { TOrder, WebSocketOrdersState } from "../utils/types";


const initialState:WebSocketOrdersState = {
  orders: [],
  // userOrders: undefined,
  total: undefined,
  totalToday: undefined,
  isConected: false,
}

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    wsConectionClose(state) {
      state = initialState;
    },
    wsConectionError(state) {
      state.isConected = false
    },
    wsConnectionStart(state, _action: PayloadAction<string>) {
      return undefined
    },
    wsConectionSuccess(state) {
      state.isConected = true
    },
    wsGetOrders(state, action:PayloadAction<{
      orders:TOrder[],
      total: number,
      totalToday: number
    }>) {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    }
  }
})

export const {
  wsConectionClose,
  wsConectionError,
  wsConnectionStart,
  wsConectionSuccess,
  wsGetOrders
} = webSocketSlice.actions;

export const wsActions = {
  onClose: wsConectionClose.type,
  onError: wsConectionError.type,
  onMessage: wsGetOrders.type,
  onOpen: wsConectionSuccess.type,
  wsInit: wsConnectionStart.type,
};

export default webSocketSlice.reducer;