import * as actionTypes from "../actions/actionsTypes"

const initialState = {
   orders: [],
   loading: false,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_BURGER_START:
         console.log('"PURCHASE_BURGER_START"')
         return {
            ...orders,
            loading: true,
         }
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         const newOrder = {
            ...action.orderData,
            id: action.orderId,
         }
         return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder),
         }
      case actionTypes.PURCHASE_BURGER_FAIL:
         return {
            ...orders,
            loading: false,
         }

      default:
         return state
   }
}
