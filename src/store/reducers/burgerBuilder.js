import * as actionTypes from "../actions/actionsTypes"
import { updateObject } from "./utility"

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

const initialState = {
   ingredients: [],
   totalPrice: 4,
   error: false,
   loading: false,
}

const burgerBuilder = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         let updatedIngredients = state.ingredients.concat(action.ingredientName)
         return updateObject(state, {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
         })
      case actionTypes.REMOVE_INGREDIENT:
         updatedIngredients = [...state.ingredients]
         let lastIndex = updatedIngredients.lastIndexOf(action.ingredientName)

         // Enter if there are ingredients of this type
         if (lastIndex !== -1) {
            // Remove the last ingredient matching this type
            updatedIngredients.splice(lastIndex, 1)
         }
         return updateObject(state, {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
         })
      case actionTypes.SET_INGREDIENTS:
         return updateObject(state, {
            ingredients: action.ingredients,
            totalPrice: 4,
            error: false,
         })
      case actionTypes.LOADING:
         return updateObject(state, {
            loading: action.loading,
         })
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return updateObject(state, {
            loading: action.error,
            error: true,
         })
      default:
         return state
   }
}

export default burgerBuilder
