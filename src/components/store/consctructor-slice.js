import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../api/api";

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async function (_, { rejectWithValue }, getState) {
    const order1 = getState().burgerConstructor.order;
    // console.log(order)
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/orders",
        {
          method: 'POST',
          headers: {
            "Content-Type": "aplication/json",
          },
          body: JSON.stringify({
            ingredients: order1
          }),
        }
      );

      if (!response.ok) {
        throw new Error("К сожалению все повара заняты... Server error.");
      }

      const data = await response.json();
      console.log(data)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    order: [],
    status: null,
    error: null,
  },
  reducers: {
    setOrderElements(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers: {
    [postOrder.pending]: (state) => {
      state.status = "...pending";
    },
    [postOrder.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [postOrder.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

// export const getOrderNumber = createAsyncThunk()

export const { setOrderElements } = constructorSlice.actions;
export default constructorSlice.reducer;
