import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../api/api";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchIngredientsData",
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch(
       config.baseUrl
      );
      if (!response.ok) {
        throw new Error('Server Error')
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredients: [],
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
  },
  extraReducers: {
    [fetchIngredientsData.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchIngredientsData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.ingredients = action.payload;
    },
    [fetchIngredientsData.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
