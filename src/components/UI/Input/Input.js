import React from "react";
import "./Input.css";

const Input = props => {
   let inputElement = null

   switch (props.inputType) {
      case "input":
         inputElement = <input className={"InputElement"} {...props.elementConfig} value={props.value} />
         break
      case "textarea":
         inputElement = <textarea className={"InputElement"} {...props.elementConfig} value={props.value} />
         break
      default:
         inputElement = <input className={"InputElement"} {...props.elementConfig} value={props.value} />
   }
   return (
      <div className={"Input"}>
         <label>{props.label}</label>
         {inputElement}
      </div>
   )
}

export default Input
