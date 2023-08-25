import { RootState } from "../store"

export const allIngredientsSelector = (state:RootState) => state.ingredients.ingredients


export const allWsStateSelector = (state:RootState) => state.websocket
export const allWsOrders = (state:RootState) => state.websocket.orders
export const allUserOrders = (state:RootState) => state.websocket.userOrders

export const userSelector = (state:RootState) => state.user.user
