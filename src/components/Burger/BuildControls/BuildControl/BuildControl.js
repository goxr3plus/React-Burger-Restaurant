import React from "react"
import "./BuildControl.css"

const BuildControl = props => (
   <div className={"BuildControl"}>
      <div className={"Label"}>{props.label}</div>
      <button className={"Less"} onClick={props.remove} disabled={props.disabled}>
         -
      </button>
      <button className={"More"} onClick={props.add}>
         +
      </button>
   </div>
)

export default BuildControl
