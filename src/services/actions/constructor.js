import { useDispatch } from "react-redux";

export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient 
})