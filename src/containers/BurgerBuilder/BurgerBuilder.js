import React, { Component } from "react"
import axiosInstance from "../../axios-orders"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import BuildControls from "./../../components/Burger/BuildControls/BuildControls"
import Burger from "./../../components/Burger/Burger"
import Modal from "./../../components/UI/Modal/Modal"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"
import { connect } from "react-redux"
import * as actionTypes from "../../store/actions"

import qs from "qs"

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

class BurgerBuilder extends Component {
   state = {
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
   }

   componentWillMount(props) {
      // ingredients: ["salad", "bacon", "cheese", "meat"]
      axiosInstance
         .get("ingredients.json")
         .then(response => {
            // console.log(this.state.ingredients)
            this.setState({
               ingredients: ["salad", "bacon", "cheese", "meat"],
               purchasable: !this.isBurgerEmpty(response.data),
            })
         })
         .catch(error => {
            this.setState({ error: true })
            // console.log(error)
         })
   }

   isBurgerEmpty = ingredients => {
      // console.log("Ingredients Length :",ingredients.length)
      return ingredients.length === 0
   }

   updatePurchaseState = ingredients => {
      this.setState({ purchasable: !this.isBurgerEmpty(ingredients) })
   }

   addIngredientHandler = ingredientType => {
      const updatedIngredients = this.props.ingredients
      updatedIngredients.push(ingredientType)

      /* Calculate the New Price */
      const newPrice = this.state.totalPrice + INGREDIENT_PRICES[ingredientType]
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
      this.updatePurchaseState(updatedIngredients)
   }

   // removeIngredientHandler = ingredientType => {
   //    const updatedIngredients = this.props.ingredients
   //    let lastIndex = updatedIngredients.lastIndexOf(ingredientType)

   //    // Enter if there are ingredients of this type
   //    if (lastIndex !== -1) {
   //       // Remove the last ingredient matching this type
   //       updatedIngredients.splice(lastIndex, 1)

   //       /* Calculate the New Price */
   //       const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredientType]
   //       this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
   //       this.updatePurchaseState(updatedIngredients)
   //    }
   // }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   cancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
   }

   continuePurchaseHandler = () => {
      //const queryParams = []
      const queryParams = qs.stringify(this.props.ingredients)
      //queryParams.push(encodeURIComponent("ingedients") + "=" + encodeURIComponent(this.state.ingredients))
      // for (let i in this.state.ingredients) {
      //    queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
      // }

      this.props.history.push({
         pathname: "/checkout",
         search: "?" + queryParams + ":" + this.state.totalPrice.toFixed(2), //.join("&"),
      })
   }

   render() {
      const disabledInfo = {
         ...this.props.ingredients,
      }

      for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0

      let orderSummary = null
      let burger = this.state.error ? <p style={{ textAlign: "center" }}> Ingredients can't be loaded </p> : <Spinner />
      if (this.props.ingredients !== null) {
         // Burger
         burger = (
            <>
               <Burger ingredients={this.props.ingredients} />
               <BuildControls
                  disabledInfo={disabledInfo}
                  add={this.props.addIngredient}
                  remove={this.props.removeIngredient}
                  totalPrice={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  purchaseHandler={this.purchaseHandler}
               />
            </>
         )

         // OrderSummary
         orderSummary = this.state.loading ? (
            <Spinner />
         ) : (
            <OrderSummary
               totalPrice={this.state.totalPrice.toFixed(2)}
               ingredients={this.props.ingredients}
               cancelPurchaseHandler={this.cancelPurchaseHandler}
               continuePurchaseHandler={this.continuePurchaseHandler}
            />
         )
      }

      if (this.state.loading) orderSummary = <Spinner />

      return (
         <>
            <Modal show={this.state.purchasing} cancelPurchaseHandler={this.cancelPurchaseHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </>
      )
   }
}

const mapStateToProps = state => {
   return { ingredients: state.ingredients }
}

const mapDispatchToProps = dispatch => {
   return {
      addIngredient: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
      removeIngredient: ingredientName =>
         dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName }),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance))
