import qs from "qs"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
   state = {
      ingredients: [],
      totalPrice: 0,
   }

   componentWillMount() {
      const totalPrize = +this.props.location.search.split(":")[1]
      const ingredients = qs.parse(this.props.location.search.split(":")[0], { ignoreQueryPrefix: true })
      this.setState({ ingredients: Object.values(ingredients), totalPrice: totalPrize })
   }

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace("/checkout/contact-data")
   }

   render() {
      return (
         <div>
            <CheckoutSummary
               ingredients={this.state.ingredients}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route
               path={this.props.match.path + "/contact-data"}
               render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />}
            />
         </div>
      )
   }
}

export default Checkout
