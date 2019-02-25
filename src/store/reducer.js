import * as actionTypes from "./actions"

const initialState = {
   ingredients: [],
   totalPrice: 4,
}

const reducer = (state = initialState, action) => {
   switch (action.state) {
      case actionTypes.ADD_INGREDIENT:
         return {}
      case actionTypes.ADD_INGREDIENT:
         return {}
      default:
         return state
   }
}

export default reducer
