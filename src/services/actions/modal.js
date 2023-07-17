import { clearIngredientDetails } from "./ingredients";

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const ClOSE_MODAL = "CLOSE_MODAL";


export const changeOnIngredientModal = (kind) => ({
  type: OPEN_INGREDIENT_MODAL,
  payload: kind
})

export const changeOnOrderModal = (kind) => ({
  type: OPEN_ORDER_MODAL,
  payload: kind
})

export const closeModal = () => {
  return function(dispatch) {
    dispatch({
      type: ClOSE_MODAL
    })
    dispatch(clearIngredientDetails())
  }
}