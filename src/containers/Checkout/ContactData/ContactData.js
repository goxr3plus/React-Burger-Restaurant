import React, { Component } from "react"
import { connect } from "react-redux"
import Button from "../../../components/UI/Button/Button"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import { updateObject, checkValidity } from "../../../shared/utility"
import * as actions from "../../../store/actions/index"
import axiosInstance from "./../../../axios-orders"
import Input from "./../../../components/UI/Input/Input"
import Spinner from "./../../../components/UI/Spinner/Spinner"
import "./ContactData.css"

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
               isEmail: true,
            },
            valid: false,
            touched: false,
         },
         deliveryMethod: {
            elementType: "select",
            elementConfig: {
               options: [
                  { value: "faster", displayValue: "Fastest" },
                  { value: "cheapest", displayValue: "Cheapest" },
               ],
            },
            value: "fastest",
            touched: false,
            validation: {},
            valid: true,
         },
      },
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
         userId: this.props.userId,
      }

      this.props.purchaseBurger(order, this.props.token)
   }

   inputChangedHandler = (event, identifier) => {
      const updatedFormElement = updateObject(this.state.orderForm[identifier], {
         value: event.target.value,
         valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
         touched: true,
      })
      const updatedOrderForm = updateObject(this.state.orderForm, {
         [identifier]: updatedFormElement,
      })

      let formIsValid = true
      for (let inputIdentifier in updatedOrderForm)
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid

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

      let form = this.props.loading ? (
         <Spinner />
      ) : (
         <form onSubmit={this.orderHandler}>
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
            <Button
               btnType="Success"
               disabled={!this.state.formIsValid}
               clicked={this.orderHandler}
            >
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
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(ContactData, axiosInstance))
