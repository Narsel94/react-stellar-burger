import { fetchIngredientsData, testAsynk } from "./ingredients-slice";
import { getIngredientsData } from "../../api/api";

jest.mock("../../api/api");

const testIngredient = {
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
};

describe("fetchIngredientsData", () => {
  it("should fetchIngredientsData with resolve response", async () => {
    const mockIngredientsData = [testIngredient];
    getIngredientsData.mockResolvedValue(mockIngredientsData);
    const dispatch = jest.fn();
    const thunk = fetchIngredientsData();
    await thunk(dispatch, () => ({}));
    //деструктуирование
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(fetchIngredientsData.pending().type);
    expect(end[0].type).toBe(fetchIngredientsData.fulfilled().type);
    expect(end[0].payload).toBe(mockIngredientsData);
  });

  it("should fetchIngredientsData with rejected response", async () => {
    const testError = {
      name: "error",
      message: "for test",
      stack: "error for test",
    };
    getIngredientsData.mockRejectedValue(testError);
    const dispatch = jest.fn();
    const thunk = fetchIngredientsData();
    await thunk(dispatch, () => ({}));
    //деструктуирование
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(fetchIngredientsData.pending().type);
    expect(end[0].type).toBe(fetchIngredientsData.rejected().type);
    expect(end[0].meta.requestStatus).toBe("rejected");
    expect(end[0].error).toEqual(testError);
  });
});
