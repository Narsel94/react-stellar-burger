import { createSlice } from "@reduxjs/toolkit";
import { TModalState } from "../utils/types";

const initialState: TModalState = {
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openIngredientDetailsModal(state) {
      state.isIngredientModalOpen = true;
    },
    openOrderDetailsModal(state) {
      state.isOrderModalOpen = true;
    },
    closeModal(state) {
      state.isIngredientModalOpen = false;
      state.isOrderModalOpen = false;
    },
  },
});

export const { openIngredientDetailsModal, openOrderDetailsModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
