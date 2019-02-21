import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"

class Checkout extends Component {
   state = {
      ingredients: {
         salad: 1,
         bacon: 1,
         cheese: 2,
         meat: 1,
      },
   }

   componentDidMount() {
      const query = new URLSearchParams(this.props.location.search)
      const ingredients = {}
      for (let param of query.entries()) {
         // ['salad','1']
         ingredients[param[0]] = +param[1]
      }
       this.setState({ ingredients: ingredients })
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
            <div>
               <CheckoutSummary
                  ingredients={this.state.ingredients}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
               />
            </div>
         </div>
      )
   }
}

export default Checkout
