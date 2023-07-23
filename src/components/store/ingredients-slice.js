import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../constants/api";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchIngredientsData",
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch(
       `${config.baseUrl}/ingredients`
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
    selectedIngredients: {
      bun: null,
      filings: []
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
      if (action.payload.type === 'bun') {
        state.selectedIngredients.bun = action.payload
      } else if (!state.selectedIngredients.bun){
        state.selectedIngredients.filings = state.selectedIngredients.filings
      }
      else {
        state.selectedIngredients.filings = state.selectedIngredients.filings.concat(action.payload) 
      }
    }, 
    updateConstuctorElements(state, action) {
      state.selectedIngredients.filings = action.payload
    },
    deleteIngredient(state, action) {
      state.selectedIngredients.filings =state.selectedIngredients.filings.filter(item => item.uuidId !== action.payload)
    }
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

export const { setIngredientDetails, clearIngredientDetails, selectIngredients, deleteIngredient, updateConstuctorElements } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
