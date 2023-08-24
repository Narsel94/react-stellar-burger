import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getIngredientsData } from "../../api/api";
import { TIngredientState, TIngredientWithUuidId } from "../../utils/types";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchIngredientsData",
  getIngredientsData
);


export const testAsynk = createAsyncThunk(
  "ingredients/testAsynk",
  getIngredientsData
 
);

const initialState: TIngredientState = {
  ingredients: [],
  selectedIngredients: {
    bun: null,
    filings: [],
  },
  status: "",
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    selectIngredients(state, action: PayloadAction<TIngredientWithUuidId>) {
      action.payload.type === "bun"
        ? (state.selectedIngredients.bun = action.payload)
        : state.selectedIngredients.bun === null
        ? (state.selectedIngredients.filings =
            state.selectedIngredients.filings =
              state.selectedIngredients.filings)
        : (state.selectedIngredients.filings =
            state.selectedIngredients.filings.concat(action.payload));
    },
    updateConstuctorElements(
      state,
      action: PayloadAction<Array<TIngredientWithUuidId>>
    ) {
      state.selectedIngredients.filings = action.payload;
    },
    deleteIngredient(state, action: PayloadAction<string>) {
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
        state.error = action.error.stack;
      });
  },
});

export const {
  selectIngredients,
  deleteIngredient,
  updateConstuctorElements,
  clearSelectedIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
