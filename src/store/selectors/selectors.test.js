import { allIngredientsSelector, allWsStateSelector } from "./selectors";

describe("redux ingredients selector", () => {
  it("shoud select ingredients from state object", () => {
    const ingredients = {
        ingredients: [
          {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
          },
        ],
      }

  const result = allIngredientsSelector({ingredients});
    expect(result).toEqual(ingredients.ingredients);
  });
});

// describe("websocket slice selector", () => {
//   it("should select websoket state from state object", () => {

//       const state = {
//         websocket: {}
//       }
 
//   })

//   const result = allWsStateSelector({websocket});

//   expect(result).toEqual(state)

// })



