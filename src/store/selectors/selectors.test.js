import { allIngredientsSelector, allWsStateSelector, allWsOrders, allUserOrders, userSelector } from "./selectors";


const initialState = {
  ingredients: {
    ingredients: [{
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
          }]
  },
  websocket: {
    orders: [],
    userOrders: []
  },
  user: {
    user: {
      email: '',
      name: ''
    }
  }
}

describe("redux ingredients selector", () => {
  it("shoud select ingredients from state object", () => {


  const result = allIngredientsSelector(initialState);
    expect(result).toEqual(initialState.ingredients.ingredients);
  });

  it('shoud select wsData from state object', () => {
    const result = allWsStateSelector(initialState)
    expect(result).toEqual(initialState.websocket)
  });

  it('should select lateste orders from state object', ()=> {
    const result = allWsOrders(initialState)
    expect(result).toEqual(initialState.websocket.orders)
  });

  it('should select user orders from state object', ()=> {
    const result = allUserOrders(initialState)
    expect(result).toEqual(initialState.websocket.userOrders)
  });
  //если точно указать ожидаемое значение 
  it('should select user data from state object', ()=> {
    const result = userSelector(initialState)
    expect(result).toEqual({email: '', name: ''})
  });

});

