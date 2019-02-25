import qs from "qs"
import React, { Component } from "react"
import { connect } from "react-redux"
import axiosInstance from "../../axios-orders"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import * as actionTypes from "../../store/actions"
import BuildControls from "./../../components/Burger/BuildControls/BuildControls"
import Burger from "./../../components/Burger/Burger"
import Modal from "./../../components/UI/Modal/Modal"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"

class BurgerBuilder extends Component {
   state = {
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
            })
         })
         .catch(error => {
            this.setState({ error: true })
            // console.log(error)
         })
   }

   isBurgerEmpty = ingredients => {
      return ingredients.length === 0
   }

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
         search: "?" + queryParams + ":" + this.props.totalPrice.toFixed(2), //.join("&"),
      })
   }

   render() {
      const disabledInfo = []
      disabledInfo["salad"] = !this.props.ingredients.includes("salad")
      disabledInfo["bacon"] = !this.props.ingredients.includes("bacon")
      disabledInfo["cheese"] = !this.props.ingredients.includes("cheese")
      disabledInfo["meat"] = !this.props.ingredients.includes("meat")

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
                  totalPrice={this.props.totalPrice}
                  purchasable={!this.isBurgerEmpty(this.props.ingredients)}
                  purchaseHandler={this.purchaseHandler}
               />
            </>
         )

         // OrderSummary
         orderSummary = this.state.loading ? (
            <Spinner />
         ) : (
            <OrderSummary
               totalPrice={this.props.totalPrice.toFixed(2)}
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
   return {
      ingredients: state.ingredients,
      totalPrice: state.totalPrice,
   }
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
