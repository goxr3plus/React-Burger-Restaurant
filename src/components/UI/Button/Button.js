import React from "react"
import "./Button.css"

const button = props => (
   <button className={["Button", props.btnType].join(" ")} onClick={props.clicked}>
      {props.children}
   </button>
)

export default button
