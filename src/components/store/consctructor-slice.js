import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "./api";
import { openOrderDetailsModal } from "./modal-slice";

export const createPostRequest = createAsyncThunk(
  "createPostOrder/postOrder",
  async (order, { dispatch }) => {
    dispatch(openOrderDetailsModal());
    const response = await postRequest(order);
    const data = response.json();
    return data;
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
