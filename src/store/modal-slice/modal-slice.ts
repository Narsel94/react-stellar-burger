import { createSlice } from "@reduxjs/toolkit";
import { TModalState } from "../../utils/types";

const initialState: TModalState = {
  isOrderModalOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOrderDetailsModal(state) {
      state.isOrderModalOpen = true;
    },
    closeModal(state) {
      state.isOrderModalOpen = false;
    },
  },
});

export const { openOrderDetailsModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
