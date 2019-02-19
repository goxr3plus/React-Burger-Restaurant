import React, { Component } from "react"
import Burger from "./../../components/Burger/Burger"
import BuildControls from "./../../components/Burger/BuildControls/BuildControls"
import Modal from "./../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axiosInstance from "../../axios-orders"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

class BurgerBuilder extends Component {
   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
   }

   updatePurchaseState = ingredients => {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey]
         })
         .reduce((sum, el) => {
            return sum + el
         }, 0)

      this.setState({ purchasable: sum > 0 })
      console.log(sum)
   }

   addIngredientHandler = type => {
      const updatedCount = this.state.ingredients[type] + 1
      const updatedIngredients = { ...this.state.ingredients }
      updatedIngredients[type] = updatedCount

      /* Calculate the New Price */
      const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
      this.updatePurchaseState(updatedIngredients)
   }

   removeIngredientHandler = type => {
      if (this.state.ingredients[type] === 0) return
      const updatedCount = this.state.ingredients[type] - 1
      const updatedIngredients = { ...this.state.ingredients }
      updatedIngredients[type] = updatedCount

      /* Calculate the New Price */
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
      this.updatePurchaseState(updatedIngredients)
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   cancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
   }

   continuePurchaseHandler = () => {
      this.setState({ loading: true })
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
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
         .then(response => this.setState({ loading: false, purchasing: false }))
         .catch(error => this.setState({ loading: false, purchasing: false }))
      // alert("You purchased bitch!")
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients,
      }

      for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0

      let orderSummary = this.state.loading ? (
         <Spinner />
      ) : (
         <OrderSummary
            totalPrice={this.state.totalPrice.toFixed(2)}
            ingredients={this.state.ingredients}
            cancelPurchaseHandler={this.cancelPurchaseHandler}
            continuePurchaseHandler={this.continuePurchaseHandler}
         />
      )

      return (
         <>
            <Modal show={this.state.purchasing} cancelPurchaseHandler={this.cancelPurchaseHandler}>
               {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
               disabledInfo={disabledInfo}
               add={this.addIngredientHandler}
               remove={this.removeIngredientHandler}
               totalPrice={this.state.totalPrice}
               purchasable={this.state.purchasable}
               purchaseHandler={this.purchaseHandler}
            />
         </>
      )
   }
}

export default withErrorHandler(BurgerBuilder, axiosInstance)
