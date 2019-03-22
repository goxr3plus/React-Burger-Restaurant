import React from "react"
import "./Order.css"
import Burger from "../Burger/Burger"

const order = props => {
   const ingredients = props.ingredients === undefined ? [] : props.ingredients
   const ingredientOutput =
      props.ingredients !== undefined
         ? props.ingredients.map((ingredient, index) => {
              return (
                 <span
                    style={{
                       display: "inline-blick",
                       margin: "0 8px",
                       border: "1px solid #ccc",
                       padding: "5px",
                    }}
                    key={index}
                 >
                    {props.ingredients[index]}
                 </span>
              )
           })
         : "No ingredents ( bugged )"

   return (
      <div className="Order">
         <p>Ingredients : {ingredientOutput}</p>
         <p style={{ textAlign: "center" }}>
            <strong>Preview</strong>
         </p>
         <Burger ingredients={ingredients} classy="Burger2" />
         <p>
            Price: <strong>USD {props.price.toFixed(2)}</strong>
         </p>
         <p>
            Delivery method: <strong>{props.deliveryMethod}</strong>
         </p>
      </div>
   )
}

export default order
