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

export const purchaseBurgerStart = orderData => {
   return dispatch => {
      axiosInstance
         .post("/orders.json", orderData)
         .then(response => {
            dispatch(purchaseBurgerSuccess(response.data, orderData))
            console.log(orderData)
            //   this.setState({ loading: false })
            //  this.props.history.push("/")
         })
         .catch(error => {
            purchaseBurgerFail(error)
         })
      //  this.setState({ loading: false })
   }
}
