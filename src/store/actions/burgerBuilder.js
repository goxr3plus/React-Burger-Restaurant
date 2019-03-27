import * as actionTypes from "./actionsTypes"
import axiosInstance from "../../axios-orders"

export const addIngredient = ingredientName => {
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName,
   }
}

export const removeIngredient = ingredientName => {
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName,
   }
}

export const setIngredients = ingredients => {
   return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients,
   }
}

export const fetchIngredientsFailed = () => {
   return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED,
   }
}

export const loading = loading => {
   return {
      type: actionTypes.LOADING,
      loading: loading,
   }
}

export const initIngredients = () => {
   return dispatch => {
      dispatch(loading(true))
      axiosInstance
         .get("/ingredients.json")
         .then(response => {
            dispatch(setIngredients([]))
            dispatch(loading(false))
         })
         .catch(error => {
            // console.log("err")
            dispatch(fetchIngredientsFailed())
            dispatch(loading(false))
         })
   }
}
