import * as actionTypes from "./actionsTypes"
import axiosInstance from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData,
   }
}

export const purchaseBurgerFail = error => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error,
   }
}

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START,
   }
}

export const purchaseBurger = orderData => {
   return dispatch => {
      dispatch(purchaseBurgerStart())
      axiosInstance
         .post("/orders.json", orderData)
         .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
         })
         .catch(error => {
            purchaseBurgerFail(error)
         })
   }
}

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT,
   }
}

export const fetchOrdersSuccess = orders => {
   return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders,
   }
}

export const fetchOrdersFail = error => {
   return {
      type: actionTypes.FETCH_ORDERS_FAILED,
      error: error,
   }
}

export const fetchOrdersStart = () => {
   return {
      type: actionTypes.FETCH_ORDERS_START,
   }
}
export const fetchOrders = () => {
   return dispatch => {
      dispatch(fetchOrdersStart())
      axiosInstance
         .get("/orders.json")
         .then(result => {
            const fetchedOrders = []
            for (let key in result.data) {
               fetchedOrders.push({
                  ...result.data[key],
                  id: key,
               })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
         })
         .catch(err => {
            dispatch(fetchOrdersFail(err))
         })
   }
}
