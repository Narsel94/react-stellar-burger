import { createSlice } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients-slice";

const modalSlice = createSlice({
  name: 'modal', 
  initialState: { 
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
  },
  reducers: {
    openIngredientDetailsModal(state) {
      state.isIngredientModalOpen = true;
      state.isOrderModalOpen = false;
    },
    openOrderDetailsModal(state) {
      state.isIngredientModalOpen = false;
      state.isOrderModalOpen = true;
    },
    closeModal(state) {
      state.isIngredientModalOpen = false;
      state.isOrderModalOpen = false;
    }
  }
});

export const {openIngredientDetailsModal, openOrderDetailsModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;