// import qs from "qs"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace("/checkout/contact-data")
   }

   render() {
      let summary = <Redirect to="/" />
      console.log(this.props.ingredients)
      // if (this.props.ingredients.length !== 0) {
         summary = (
            <div>
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
   }
}

export default connect(
   mapStateToProps,
   null
)(Checkout)
