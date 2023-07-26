import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal', 
  initialState: { 
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
    isModalOpen: false,
  },
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
    }
  }
});

export const {openIngredientDetailsModal, openOrderDetailsModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;