import ingredientsReducer, {
  selectIngredients,
  deleteIngredient,
  updateConstuctorElements,
  clearSelectedIngredients,
  fetchIngredientsData,
} from "./ingredients-slice";

const testIngredient = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

const testAddBun = {
  ...testIngredient,
  uuidId: "f429ed59-7675-4162-bed8-907eea02f4e9",
};

const secondBun = {
  ...testAddBun,
  _id: "qweqweqw",
  name: "Флюоресцентная",
  carbohydrates: 8225,
  calories: 62243,
  price: 98228,
};

const testAddFilings = {
  _id: "643d69a5c3f7b9001cfa0943",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
  uuidId: "6e9c61f8-e404-4d68-806b-7490a97c3135",
};

const testDeletFiling = { ...testAddFilings, uuidId: "123asd" };

describe("ingredientsSlice", () => {
  it('should add bun ingredient /state - undefinded/ with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: testAddBun,
    };
    const result = ingredientsReducer(undefined, action);
    expect(result.selectedIngredients.bun).toBe(action.payload);
  });

  it('should add bun ingredient to burger constructor with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: testAddBun,
    };
    const testState = {
      selectedIngredients: {
        bun: null,
        filings: [],
      },
    };
    const result = ingredientsReducer(testState, action);
    expect(result.selectedIngredients.bun).toBe(action.payload);
  });

  it('should add filings to burger constructor if there is bun with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: testAddFilings,
    };
    const testStateWithBun = {
      selectedIngredients: {
        bun: testAddBun,
        filings: [],
      },
    };
    const result = ingredientsReducer(testStateWithBun, action);
    expect(result.selectedIngredients.filings[0]).toBe(action.payload);
  });

  it('should not add filings if there are no bun and filings with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: testAddFilings,
    };
    const result = ingredientsReducer(undefined, action);
    expect(result.selectedIngredients.filings.length).toBe(0);
  });

  it('should replace bun if there is bun with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: secondBun,
    };
    const testStateWithBun = {
      selectedIngredients: {
        bun: testAddBun,
        filings: [],
      },
    };
    const result = ingredientsReducer(testStateWithBun, action);
    expect(result.selectedIngredients.bun).toBe(action.payload);
  });

  it('should add new filing to filing Array with "selectIngredients" action', () => {
    const action = {
      type: selectIngredients.type,
      payload: testAddFilings,
    };
    const testStateWithBunAndFilings = {
      selectedIngredients: {
        bun: testAddBun,
        filings: [testAddFilings, testAddFilings, testAddFilings],
      },
    };
    const result = ingredientsReducer(testStateWithBunAndFilings, action);
    expect(result.selectedIngredients.filings.length).toBe(4);
  });

  it('should remove ingredient from constructor filings by uuidId with "deleteIngredient" action', () => {
    const testStateWithBunAndFilings = {
      selectedIngredients: {
        bun: testAddBun,
        filings: [testAddFilings, testAddFilings, testDeletFiling],
      },
    };
    const action = { type: deleteIngredient.type, payload: "123asd" };
    const result = ingredientsReducer(testStateWithBunAndFilings, action);
    expect(result.selectedIngredients.filings.length).toBe(2);
  });

  it('should update filings Array after sorting with "updateConstuctorElements" action', () => {
    const testStateWithFilingsForSorting = {
      selectedIngredients: {
        filings: [
          testAddFilings,
          testDeletFiling,
          testAddFilings,
          testDeletFiling,
        ],
      },
    };

    const action = {
      type: updateConstuctorElements.type,
      payload: [
        testAddFilings,
        testAddFilings,
        testDeletFiling,
        testDeletFiling,
      ],
    };
    const result = ingredientsReducer(testStateWithFilingsForSorting, action);
    expect(result.selectedIngredients.filings).toBe(action.payload);
  });

  it('should delete buns and filings from state with "clearSelectedIngredients" action', () => {
    const testStateWithBunAndFilings = {
      selectedIngredients: {
        bun: testAddBun,
        filings: [testAddFilings, testAddFilings, testAddFilings],
      },
    };

    const action = { type: clearSelectedIngredients.type };

    const result = ingredientsReducer(testStateWithBunAndFilings, action);
    expect(result.selectedIngredients.bun).toBeNull();
    expect(result.selectedIngredients.filings).toHaveLength(0);
  });
});

describe("ingredientsSlece/extraReducers", () => {
  it('should change status with "fetchIngredientsData.pending" action', () => {
    const initialState = {
      status: "",
      error: null,
    };
    const state = ingredientsReducer(
      initialState,
      fetchIngredientsData.pending()
    );
    expect(state).toEqual({
      status: "loading",
      error: null,
    });
  });
  it('should fetch ingredients with "fetchIngredientsData.fulfilled" action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredientsData.fulfilled([testIngredient, testIngredient])
    );
    expect(state).toEqual({
      ingredients: [testIngredient, testIngredient],
      selectedIngredients: {
        bun: null,
        filings: [],
      },
      status: "resolved",
      error: null,
    });
  });
  it('should change status with "fetchIngredientsData.rejected" action', () => {
    const initialState = {
      status: "",
      error: null,
    };
    const testError = {
      name: "error",
      message: "for test",
      stack: "error for test",
    };

    const state = ingredientsReducer(
      initialState,
      fetchIngredientsData.rejected(testError)
    );
    expect(state).toEqual({
      status: "rejected",
      error: "error for test",
    });
  });
});
