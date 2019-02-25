import * as actionTypes from "./actions"

const initialState = {
   ingredients: ["salad", "cheese", "bacon"],
   totalPrice: 4,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         const updatedIngredients1 = state.ingredients.concat(action.ingredientName)

         //  /* Calculate the New Price */
         //  const newPrice = this.state.totalPrice + INGREDIENT_PRICES[ingredientType]
         //  this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
         //  this.updatePurchaseState(updatedIngredients)
         return {
            ...state,
            ingredients: updatedIngredients1,
         }
      case actionTypes.REMOVE_INGREDIENT:
         const updatedIngredients = [...state.ingredients]
         let lastIndex = updatedIngredients.lastIndexOf(action.ingredientName)

         // Enter if there are ingredients of this type
         if (lastIndex !== -1) {
            // Remove the last ingredient matching this type
            updatedIngredients.splice(lastIndex, 1)

            /* Calculate the New Price */
            // const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredientType]
            // this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
            // this.updatePurchaseState(updatedIngredients)
         }
         return {
            ...state,
            ingredients: updatedIngredients,
         }
      default:
         return state
   }
}

export default reducer
