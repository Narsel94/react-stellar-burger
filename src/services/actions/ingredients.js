import { getIngredientData, testRequest } from "../../components/api/api";
import thunk from 'redux-thunk';
import { config } from "../../components/api/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_SUCCESS";
export const OPEN_INGREDIENT_DETAILS = "OPEN_INGREDIENT_DETAILS";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export function getData() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    getIngredientData()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
      })
  } 
}

export function getTextData() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
      }).catch(err => {
        dispatch({type: GET_INGREDIENTS_FAILED})
      })
  } 
}



















export const openIngredientDetails = (ingredient) => ({
  type:OPEN_INGREDIENT_DETAILS,
  payload: ingredient
})

export const clearIngredientDetails = () => ({
  type: CLEAR_CURRENT_INGREDIENT
})

