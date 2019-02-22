import React from "react"
import "./Order.css"
import Burger from "../Burger/Burger"

const order = props => {
   const ingredientOutput = props.ingredients.map((ingredient, index) => {
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

   return (
      <div className="Order">
         <p>Ingredients : {ingredientOutput}</p>
         <p style={{ textAlign: "center" }}>
            <strong>Preview</strong>
         </p>
         <Burger ingredients={props.ingredients} classy="Burger2" />
         <p>
            Price: <strong>USD {props.price}</strong>{" "}
         </p>
      </div>
   )
}

export default order
