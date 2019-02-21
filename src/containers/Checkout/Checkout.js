import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import qs from "qs"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
   state = {
      ingredients: [],
   }

   componentDidMount() {
      // console.log(this.props.location.search)
      // const query = new URLSearchParams(this.props.location.search)

      // console.log(query)

      const ingredients = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

      console.log(ingredients)
      //const firstParamData = query.ingredients(0)[1]
      // for (let param of query.entries()) {
      //    // ['salad','1']
      //    ingredients[param[0]] = +param[1]
      // }
      this.setState({ ingredients: Object.values(ingredients) })
   }

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace("/checkout/contact-data")
   }

   render() {
      // console.log("[Checkout.js] " + this.props)
      return (
         <div>
            <CheckoutSummary
               ingredients={this.state.ingredients}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
         </div>
      )
   }
}

export default Checkout
