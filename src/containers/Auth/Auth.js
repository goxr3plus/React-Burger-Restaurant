import React, { Component } from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import "./Auth.css"

class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: "input",
            elementConfig: {
               type: "email",
               placeholder: "Mail Address",
            },
            value: "",
            validation: {
               required: true,
               isEmail: true,
            },
            valid: false,
            touched: false,
         },
         password: {
            elementType: "input",
            elementConfig: {
               type: "password",
               placeholder: "Password",
            },
            value: "",
            validation: {
               required: true,
               minLength: 6,
            },
            valid: false,
            touched: false,
         },
      },
   }

   checkValidity(value, rules) {
      let isValid = true
      if (!rules) {
         return true
      }

      if (rules.required) {
         isValid = value.trim() !== "" && isValid
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
         isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
         const pattern = /^\d+$/
         isValid = pattern.test(value) && isValid
      }

      return isValid
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(
               event.target.value,
               this.state.controls[controlName].validation
            ),
            touched: true,
         },
      }
      this.setState({ controls: updatedControls })
   }

   render() {
      const forElementsArray = []
      for (let key in this.state.controls) {
         forElementsArray.push({
            id: key,
            config: this.state.controls[key],
         })
      }

      const form = forElementsArray.map(formElement => (
         <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
         />
      ))
      return (
         <div className="Auth">
            <form>
               {form}
               <Button
                  btnType="Success"
                  disabled={!this.state.formIsValid}
                  clicked={this.orderHandler}
               >
                  Submit
               </Button>
            </form>
         </div>
      )
   }
}

export default Auth
