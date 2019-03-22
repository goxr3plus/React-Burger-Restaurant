import * as actionTypes from "../actions/actionsTypes"

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
         const updatedIngredients1 = state.ingredients.concat(action.ingredientName)

         //  /* Calculate the New Price */
         const newPrice1 = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
         //this.updatePurchaseState(updatedIngredients)

         return {
            ...state,
            ingredients: updatedIngredients1,
            totalPrice: newPrice1,
         }
      case actionTypes.REMOVE_INGREDIENT:
         const updatedIngredients = [...state.ingredients]
         let lastIndex = updatedIngredients.lastIndexOf(action.ingredientName)
         let newPrice = state.totalPrice

         // Enter if there are ingredients of this type
         if (lastIndex !== -1) {
            // Remove the last ingredient matching this type
            updatedIngredients.splice(lastIndex, 1)

            /* Calculate the New Price */
            newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            //this.updatePurchaseState(updatedIngredients)
         }

         return {
            ...state,
            ingredients: updatedIngredients,
            totalPrice: newPrice,
         }
      case actionTypes.SET_INGREDIENTS:
         return {
            ...state,
            ingredients: action.ingredients,
            totalPrice: 4,
            error: false,
         }
      case actionTypes.LOADING:
         return {
            ...state,
            loading: action.loading,
         }
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return {
            ...state,
            loading: action.error,
            error: true,
         }
      default:
         return state
   }
}

export default burgerBuilder
