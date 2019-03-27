import * as actionTypes from "../actions/actionsTypes"
import { updateObject } from "./utility"

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
   building: false,
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
         return addIngredient(state, action)
      case actionTypes.REMOVE_INGREDIENT:
         return removeIngredient(state, action)
      case actionTypes.SET_INGREDIENTS:
         return setIngredients(state, action)
      case actionTypes.LOADING:
         return loading(state, action)
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return fetchIngredientsFailed(state, action)
      default:
         return state
   }
}

const setIngredients = (state, action) => {
   return updateObject(state, {
      ingredients: action.ingredients,
      totalPrice: 4,
      error: false,
      building: false,
   })
}

const loading = (state, action) => {
   return updateObject(state, {
      loading: action.loading,
   })
}

const fetchIngredientsFailed = (state, action) => {
   return updateObject(state, {
      loading: action.error,
      error: true,
   })
}

const addIngredient = (state, action) => {
   let updatedIngredients = state.ingredients.concat(action.ingredientName)
   return updateObject(state, {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true,
   })
}

const removeIngredient = (state, action) => {
   let updatedIngredients = [...state.ingredients]
   let lastIndex = updatedIngredients.lastIndexOf(action.ingredientName)

   // Enter if there are ingredients of this type
   if (lastIndex !== -1) {
      // Remove the last ingredient matching this type
      updatedIngredients.splice(lastIndex, 1)
   }
   return updateObject(state, {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      building: true,
   })
}

export default burgerBuilder
