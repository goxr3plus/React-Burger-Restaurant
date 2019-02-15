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
   </div>
)

export default BuildControls
