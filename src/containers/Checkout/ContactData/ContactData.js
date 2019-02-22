import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import axiosInstance from "./../../../axios-orders"
import Input from "./../../../components/UI/Input/Input"
import Spinner from "./../../../components/UI/Spinner/Spinner"
import "./ContactData.css"

class ContactData extends Component {
   state = {
      orderForm: {
         customer: {
            name: {
               elementType: "input",
               elementConfig: {
                  type: "text",
                  placeholder: "Your Name",
               },
               value: "",
            },
            street: {
               elementType: "input",
               elementConfig: {
                  type: "text",
                  placeholder: "Street",
               },
               value: "",
            },
            zipCode: {
               elementType: "input",
               elementConfig: {
                  type: "text",
                  placeholder: "ZipCode",
               },
               value: "",
            },
            country: {
               elementType: "input",
               elementConfig: {
                  type: "text",
                  placeholder: "Country",
               },
               value: "",
            },
            email: {
               elementType: "input",
               elementConfig: {
                  type: "email",
                  placeholder: "Your E-mail",
               },
               value: "",
            },
         },
         deliveryMethod: {
            elementType: "select",
            elementConfig: {
               options: [{ value: "faster", displayValue: "Fastest" }, { value: "cheapest", displayValue: "Cheapest" }],
            },
            value: "",
         },
      },
      loading: false,
   }

   orderHandler = event => {
      event.preventDefault()
      this.setState({ loading: true })
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         orderForm: this.props.orderForm,
      }

      //Firebase specific
      axiosInstance
         .post("/orders.json", order)
         .then(response => {
            this.setState({ loading: false })
            this.props.history.push("/")
         })
         .catch(error => this.setState({ loading: false }))
   }

   render() {
      let form = this.state.loading ? (
         <Spinner />
      ) : (
         <form>
            <Input elementType="" elementConfig="" value="" />

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
