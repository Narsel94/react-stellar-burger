import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openOrderDetailsModal } from "./modal-slice";
import { clearSelectedIngredients } from "./ingredients-slice";
import { postOrder } from "../api/api";
import { TConstructorState } from "../utils/types";
import { TPostOrderResponse } from "../utils/types";


export const createPostRequest = createAsyncThunk(
  "createPostOrder/postOrder",
  async (orderData:string[], { dispatch }) => {
    dispatch(openOrderDetailsModal());
    const data:TPostOrderResponse = await postOrder(orderData);
    dispatch(clearSelectedIngredients());
    return data;
  }
);

const initialState: TConstructorState = {
  order: null,
  status: null,
  error: null,
};

const constructorSlice = createSlice({
  name: "constructor",

  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.order = action.payload;
    },
    setError(state, action) {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostRequest.pending, (state) => {
        state.status = "...pending";
        state.error = null;
      })
      .addCase(createPostRequest.fulfilled, (state, action) => {
        state.order = action.payload.order.number;
        state.status = "resolved";
      })
      .addCase(createPostRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { setOrderDetails: setOrderElements } = constructorSlice.actions;
export default constructorSlice.reducer;
