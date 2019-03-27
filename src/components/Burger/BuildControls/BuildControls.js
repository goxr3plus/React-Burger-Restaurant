import React from "react"
import "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
   { label: "Salad", type: "salad" },
   { label: "Bacon", type: "bacon" },
   { label: "Cheese", type: "cheese" },
   { label: "Meat", type: "meat" },
]

const BuildControls = props => (
   <div className={"BuildControls"}>
      <p>
         {" "}
         Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(cntrl => {
         return (
            <BuildControl
               key={cntrl.label}
               label={cntrl.label}
               add={() => props.add(cntrl.type)}
               remove={() => props.remove(cntrl.type)}
               disabled={props.disabledInfo[cntrl.type]}
            />
         )
      })}

      <button
         className={"OrderButton"}
         disabled={!props.purchasable}
         onClick={props.purchaseHandler}
      >
         {props.isAuthenticated ? "Order Now" : "Sign Up To Order"}
      </button>
   </div>
)

export default BuildControls
