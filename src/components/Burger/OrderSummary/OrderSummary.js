import React from "react"
import Button from "./../../UI/Button/Button"

const orderSummary = props => {
   const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
      return (
         <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {props.ingredients[igKey]}
         </li>
      )
   })
   return (
      <>
         <h3> Your Order</h3>
         <p> A delicious burger with the following ingredients:</p>
         <ul>{ingredientSummary}</ul>
         <p>
            <strong>Total Price:{props.totalPrice}</strong>
         </p>
         <p>Continue to Checkout?</p>
         <Button btnType="Danger" clicked={props.cancelPurchaseHandler}>
            Cancel
         </Button>
         <Button btnType="Success" clicked={props.continuePurchaseHandler}>
            Continue
         </Button>
      </>
   )
}

export default orderSummary
