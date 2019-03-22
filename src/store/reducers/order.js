import * as actionTypes from "../actions/actionsTypes"

const initialState = {
   orders: [],
   loading: false,
   purchased: false,
}

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_INIT:
         return {
            ...state,
            purchased: false,
         }
      case actionTypes.PURCHASE_BURGER_START:
         return {
            ...state,
            loading: true,
         }
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         console.log("Successful purchase")
         const newOrder = {
            ...action.orderData,
            id: action.orderId,
         }
         return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true,
         }
      case actionTypes.PURCHASE_BURGER_FAIL:
         return {
            ...state,
            loading: false,
         }
      case actionTypes.FETCH_ORDERS_START:
         return {
            ...state,
            loading: true,
         }
      case actionTypes.FETCH_ORDERS_FAILED:
         return {
            ...state,
            loading: false,
         }
      case actionTypes.FETCH_ORDERS_SUCCESS:
         return {
            ...state,
            orders: action.orders,
            loading: false,
         }

      default:
         return state
   }
}

export default orderReducer
