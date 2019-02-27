import * as actionTypes from "./actionsTypes"

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
