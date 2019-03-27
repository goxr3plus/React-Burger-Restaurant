import React, { Component } from "react"
import Order from "./../../components/Order/Order"
import axiosInstance from "./../../axios-orders"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"
import Spinner from "./../../components/UI/Spinner/Spinner"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

class Orders extends Component {
   componentDidMount() {
      this.props.onFetchOrders(this.props.token, this.props.userId)
   }

   render() {
      return (
         <div>
            {this.props.loading ? (
               <Spinner />
            ) : this.props.orders.length !== 0 ? (
               this.props.orders.map(order => (
                  <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price}
                     deliveryMethod={order.orderData.deliveryMethod}
                  />
               ))
            ) : (
               <h1 style={{ textAlign: "center" }}>No orders yet :)</h1>
            )}
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      orders: state.order.orders,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId,
   }
}
const mapDispatchToProps = dispatch => {
   return {
      onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(Orders, axiosInstance))
