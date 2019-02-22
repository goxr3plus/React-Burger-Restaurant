import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import "./ContactData.css"
import axiosInstance from "./../../../axios-orders"
import Spinner from "./../../../components/UI/Spinner/Spinner"

class ContactData extends Component {
   state = {
      name: "",
      email: "",
      address: {
         street: "",
         postalCode: "",
      },
      loading: false,
   }

   orderHandler = event => {
      event.preventDefault()
      this.setState({ loading: true })
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         customer: {
            name: "Max",
            address: {
               address: "Testreet 1",
               zipCode: "324324",
               country: "Germany",
            },
            email: "goxr3plus@gmail.com",
         },
         deliveryMethod: "fastest",
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
            <input className="Input" type="text" name="name" placeholder="Your Name" />
            <input className="Input" type="email" name="email" placeholder="Your Email" />
            <input className="Input" type="text" name="street" placeholder="Street" />
            <input className="Input" type="text" name="postal" placeholder="Post Code" />
            <Button btnType="Success" clicked={this.orderHandler}>
               Order
            </Button>
         </form>
      )
      return (
         <div className="ContactData">
            <h4> Enter your contact data</h4>
            {form}
         </div>
      )
   }
}

export default ContactData
