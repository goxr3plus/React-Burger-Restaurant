import React, { Component } from "react"
import Button from "./../../UI/Button/Button"

class OrderSummary extends Component {
   componentDidUpdate(prevProps, prevState) {
      // console.log("[OrderSummary.js] componentDidUpdate")
   }

   render() {
      const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
         return (
            <li key={igKey}>
               <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
         )
      })

      return (
         <>
            <h3> Your Order</h3>
            <p> A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>
               <strong>Total Price:{this.props.totalPrice}</strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancelPurchaseHandler}>
               Cancel
            </Button>
            <Button btnType="Success" clicked={this.props.continuePurchaseHandler}>
               Continue
            </Button>
         </>
      )
   }
}

export default OrderSummary
