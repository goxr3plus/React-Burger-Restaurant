import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import axiosInstance from "./../../../axios-orders"
import Input from "./../../../components/UI/Input/Input"
import Spinner from "./../../../components/UI/Spinner/Spinner"
import "./ContactData.css"
import { runInContext } from "vm"

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: "input",
            elementConfig: {
               type: "text",
               placeholder: "Your Name",
            },
            value: "",
            validation: {
               required: true,
            },
            valid: false,
         },
         street: {
            elementType: "input",
            elementConfig: {
               type: "text",
               placeholder: "Street",
            },
            value: "",
            validation: {
               required: true,
            },
            valid: false,
         },
         zipCode: {
            elementType: "input",
            elementConfig: {
               type: "text",
               placeholder: "ZipCode",
            },
            value: "",
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5,
            },
            valid: false,
         },
         country: {
            elementType: "input",
            elementConfig: {
               type: "text",
               placeholder: "Country",
            },
            value: "",
            validation: {
               required: true,
            },
            valid: false,
         },
         email: {
            elementType: "input",
            elementConfig: {
               type: "email",
               placeholder: "Your E-mail",
            },
            value: "",
            validation: {
               required: true,
            },
            valid: false,
         },
         deliveryMethod: {
            elementType: "select",
            elementConfig: {
               options: [{ value: "faster", displayValue: "Fastest" }, { value: "cheapest", displayValue: "Cheapest" }],
            },
            value: "",
            validation: {
               required: true,
            },
            valid: true,
         },
      },
      loading: false,
   }

   checkValidity(value, rules) {
      let isValid = false

      if (rules.required) {
         isValid = value.trim() !== ""
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength
      }

      return isValid
   }

   orderHandler = event => {
      event.preventDefault()
      this.setState({ loading: true })
      const formData = {}
      for (let elementIdentifier in this.state.orderForm) {
         formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value
      }

      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         orderData: formData,
      }

      //Firebase specific
      axiosInstance
         .post("/orders.json", order)
         .then(response => {
            this.setState({ loading: false })
            //  this.props.history.push("/")
         })
         .catch(error => this.setState({ loading: false }))
   }

   inputChangedHandler = (event, identifier) => {
      const updatedOrderForm = { ...this.state.orderForm }
      const updatedFormElement = { ...updatedOrderForm[identifier] }

      updatedFormElement.value = event.target.value
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedOrderForm[identifier] = updatedFormElement
      console.log(updatedFormElement.valid)
      this.setState({ orderForm: updatedOrderForm })
   }

   render() {
      const forElementsArray = []
      for (let key in this.state.orderForm) {
         forElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
         })
      }

      let form = this.state.loading ? (
         <Spinner />
      ) : (
         <form onSubmit={this.orderHandler}>
            {/* <Input elementType="" elementConfig="" value="" /> */}
            {forElementsArray.map(formElement => (
               <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  changed={event => this.inputChangedHandler(event, formElement.id)}
               />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>
               Order
            </Button>
         </form>
      )
      return (
         <div className={"ContactData"}>
            <h4> Enter your contact data</h4>
            {form}
         </div>
      )
   }
}

export default ContactData
