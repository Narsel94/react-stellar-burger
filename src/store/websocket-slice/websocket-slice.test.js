import websocketReducer, {
  wsConectionClose,
  wsConectionError,
  wsConectionSuccess,
  wsGetOrders,
  wsGetUserOrders,
  wsConnectionStart
} from "./websocket-slice";

const testOrder = {
  _id: "64e7752382e277001bfaacca",
  ingredients: [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0944",
    "643d69a5c3f7b9001cfa093d",
  ],
  status: "done",
  name: "Space традиционный-галактический флюоресцентный бургер",
  createdAt: "2023-08-24T15:20:03.148Z",
  updatedAt: "2023-08-24T15:20:03.348Z",
  number: 17617,
};

const initialState = {
  orders: [],
  userOrders: [],
  total: undefined,
  totalToday: undefined,
  isConected: false,
};

describe("WebSocketSlice", () => {
  it('should reset state object with data to initial state with  "wsConectionClose" action', () => {
    const state = {
      orders: [testOrder, testOrder, testOrder],
      userOrders: [testOrder, testOrder, testOrder],
      total: 123,
      totalToday: 123,
      isConected: true,
    };
    const action = {
      type: wsConectionClose.type,
    };
    const result = websocketReducer(state, action);

    expect(result).toEqual({
      orders: [],
      userOrders: [],
      isConected: false,
      total: undefined,
      totalToday: undefined,
    });
  });

  it('should change conected status to false with "wsConectionError" action', () => {
    const state = {
      isConected: true,
    };

    const action = {
      type: wsConectionError.type,
    };

    const result = websocketReducer(state, action);
    expect(result.isConected).toBe(false);
  });

  it('should change conected status to true with "wsConectionSuccess" action', () => {
    const state = {
      isConected: false,
    };

    const action = {
      type: wsConectionSuccess.type,
    };

    const result = websocketReducer(state, action);
    expect(result.isConected).toBe(true);
  });

  it('should set data with "wsGetOrders" action', () => {
    const action = {
      type: wsGetOrders.type,
      payload: {
        orders: [testOrder, testOrder, testOrder],
        total: 123,
        totalToday: 123,
      },
    };

    const result = websocketReducer(undefined, action);
    expect(result.orders).toBe(action.payload.orders);
    expect(result.total).toBe(action.payload.total);
    expect(result.totalToday).toBe(123);
  });

  it('should set user orders data with "wsGetUserOrders" action', () => {
    const state = {
      userOrders: [testOrder, testOrder, testOrder, testOrder, testOrder],
    };

    const action = {
      type: wsGetUserOrders.type,
      payload: {
        orders: [testOrder, testOrder, testOrder],
      },
    };

    const result = websocketReducer(state, action);
    console.log(result);
    expect(result.userOrders).toEqual([testOrder, testOrder, testOrder]);
  });
});
