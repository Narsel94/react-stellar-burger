import { OPEN_ORDER_MODAL, OPEN_INGREDIENT_MODAL, ClOSE_MODAL } from "../actions/modal"


const modalInitialState ={
  isOrderModalOpen: false,
  isIngredientModalOpen: false,
}

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state, 
        isIngredientModalOpen: true,
        isOrderModalOpen: false,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: true,
        isIngredientModalOpen: false
      };
    }
    case ClOSE_MODAL: {
      return {
        ...state,
        isOrderModalOpen: false,
        isIngredientModalOpen: false 
      }
    }
    default: {
      return state;
    }
  }

}