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
            console.log(response.data)
         })
         .catch(error => {
            purchaseBurgerFail(error)
         })
   }
}
