import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import axiosInstance from "./../../../axios-orders"
import Input from "./../../../components/UI/Input/Input"
import Spinner from "./../../../components/UI/Spinner/Spinner"
import "./ContactData.css"
import { connect } from "react-redux"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"

class ContactData extends Component {
   state = {
      formIsValid: false,
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
            touched: false,
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
            touched: false,
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
            touched: false,
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
            touched: false,
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
            touched: false,
         },
         deliveryMethod: {
            elementType: "select",
            elementConfig: {
               options: [{ value: "faster", displayValue: "Fastest" }, { value: "cheapest", displayValue: "Cheapest" }],
            },
            value: "fastest",
            touched: false,
            validation: {},
            valid: true,
         },
      },
   }

   checkValidity(value, rules) {
      let isValid = true

      if (rules.required) {
         isValid = value.trim() !== "" && isValid
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid
      }

      return isValid
   }

   orderHandler = event => {
      event.preventDefault()
      const formData = {}
      for (let elementIdentifier in this.state.orderForm) {
         formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value
      }

      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         orderData: formData,
      }

      this.props.purchaseBurger(order)
   }

   inputChangedHandler = (event, identifier) => {
      const updatedOrderForm = {
         ...this.state.orderForm,
      }
      const updatedFormElement = { ...updatedOrderForm[identifier] }

      updatedFormElement.value = event.target.value
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true
      updatedOrderForm[identifier] = updatedFormElement

      let formIsValid = true
      for (let inputIdentifier in updatedOrderForm) formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid

      this.setState({ formIsValid: formIsValid, orderForm: updatedOrderForm })
   }

   render() {
      const forElementsArray = []
      for (let key in this.state.orderForm) {
         forElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
         })
      }

      console.log(this.props.loading)
      let form = this.props.loading ? (
         <Spinner />
      ) : (
         <form onSubmit={this.orderHandler}>
            {/* <Input elementType="" elementConfig="" value="" /> */}
            {forElementsArray.map(formElement => (
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
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>
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
const mapStateToProps = state => {
   return {
      ingredients: state.ingredients,
      totalPrice: state.totalPrice,
      loading: state.loading,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      purchaseBurger: orderData => dispatch(actions.purchaseBurger(orderData)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(ContactData, axiosInstance))
