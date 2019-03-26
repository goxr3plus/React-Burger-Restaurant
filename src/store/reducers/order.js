import * as actionTypes from "../actions/actionsTypes"

const initialState = {
   orders: [],
   loading: false,
   purchased: false,
}

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_INIT:
         return purchaseInit(state, action)
      case actionTypes.PURCHASE_BURGER_START:
         return purchaseBurgerStart(state, action)
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         return purchaseBurgerSuccess(state, action)
      case actionTypes.PURCHASE_BURGER_FAIL:
         return purchaseBurgerFail(state, action)
      case actionTypes.FETCH_ORDERS_START:
         return fetchOrdersStart(state, action)
      case actionTypes.FETCH_ORDERS_FAILED:
         return fetchOrdersFailed(state, action)
      case actionTypes.FETCH_ORDERS_SUCCESS:
         return fetchOrdersSuccess(state, action)
      default:
         return state
   }
}

const purchaseInit = (state, action) => {
   return {
      ...state,
      purchased: false,
   }
}

const purchaseBurgerStart = (state, action) => {
   return {
      ...state,
      loading: true,
   }
}
const purchaseBurgerSuccess = (state, action) => {
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
}
const purchaseBurgerFail = (state, action) => {
   return {
      ...state,
      loading: false,
   }
}
const fetchOrdersStart = (state, action) => {
   return {
      ...state,
      loading: true,
   }
}
const fetchOrdersFailed = (state, action) => {
   return {
      ...state,
      loading: false,
   }
}
const fetchOrdersSuccess = (state, action) => {
   return {
      ...state,
      orders: action.orders,
      loading: false,
   }
}

export default orderReducer
