// import qs from "qs"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"
import * as actions from "../../store/actions/index"

class Checkout extends Component {
   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace("/checkout/contact-data")
   }

   render() {
      let summary = <Redirect to="/" />
      // if (this.props.ingredients.length !== 0) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
         <div>
            {purchasedRedirect}
            <CheckoutSummary
               ingredients={this.props.ingredients}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
         </div>
      )
      // }
      return summary
   }
}

const mapStateToProps = state => {
   return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      purchased: state.order.purchased,
   }
}

export default connect(
   mapStateToProps,
   null
)(Checkout)
