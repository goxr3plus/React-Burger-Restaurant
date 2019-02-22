import React from "react"
import "./Input.css"

const Input = props => {
   let inputElement = null
   let inputClasses = ["InputElement"]

   if (props.invalid && props.shouldValidate) inputClasses.push("Invalid")

   inputClasses = inputClasses.join(" ")

   switch (props.elementType) {
      case "input":
         inputElement = (
            <input
               className={inputClasses}
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
            />
         )
         break
      case "textarea":
         inputElement = (
            <textarea
               className={inputClasses}
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
            />
         )
         break
      case "select":
         inputElement = (
            <select className={inputClasses} value={props.value} onChange={props.changed}>
               {props.elementConfig.options.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.displayValue}
                  </option>
               ))}
            </select>
         )
         break
      default:
         inputElement = null
   }
   return (
      <div className={"Input"}>
         <label>{props.label}</label>
         {inputElement}
      </div>
   )
}

export default Input
