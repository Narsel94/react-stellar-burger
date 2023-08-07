import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsData } from "../api/api";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchIngredientsData",
  getIngredientsData
  
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredients: {
      bun: null,
      filings: [],
    },
    draggedIngredient: {},
    currentIngredient: {},
    status: null,
    error: null,
  },
  reducers: {
    setIngredientDetails(state, action) {
      state.currentIngredient = action.payload;
    },
    clearIngredientDetails(state) {
      state.currentIngredient = null;
    },
    selectIngredients(state, action) {
      if (action.payload.type === "bun") {
        state.selectedIngredients.bun = action.payload;
      } else if (!state.selectedIngredients.bun) {
        state.selectedIngredients.filings = state.selectedIngredients.filings;
      } else {
        state.selectedIngredients.filings =
          state.selectedIngredients.filings.concat(action.payload);
      }
    },
    updateConstuctorElements(state, action) {
      state.selectedIngredients.filings = action.payload;
    },
    deleteIngredient(state, action) {
      state.selectedIngredients.filings =
        state.selectedIngredients.filings.filter(
          (item) => item.uuidId !== action.payload
        );
    },
    clearSelectedIngredients(state) {
      state.selectedIngredients = { bun: null, filings: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.status = "resolved";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const {
  setIngredientDetails,
  clearIngredientDetails,
  selectIngredients,
  deleteIngredient,
  updateConstuctorElements,
  clearSelectedIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
