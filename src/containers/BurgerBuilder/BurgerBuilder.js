import React, { Component } from "react"
import { connect } from "react-redux"
import axiosInstance from "../../axios-orders"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import * as actions from "../../store/actions/index"
import BuildControls from "./../../components/Burger/BuildControls/BuildControls"
import Burger from "./../../components/Burger/Burger"
import Modal from "./../../components/UI/Modal/Modal"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"

class BurgerBuilder extends Component {
   state = {
      purchasing: false,
   }

   componentDidMount() {
      this.props.initIngredients()
   }

   isBurgerEmpty = ingredients => {
      return ingredients.length === 0
   }

   purchaseHandler = () => {
      if (this.props.isAuthenticated) this.setState({ purchasing: true })
      else this.props.history.push("/auth")
   }

   cancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      this.props.onInitPurchase()
      this.props.history.push("/checkout")
   }

   render() {
      const disabledInfo = []
      disabledInfo["salad"] = !this.props.ingredients.includes("salad")
      disabledInfo["bacon"] = !this.props.ingredients.includes("bacon")
      disabledInfo["cheese"] = !this.props.ingredients.includes("cheese")
      disabledInfo["meat"] = !this.props.ingredients.includes("meat")

      let orderSummary = null
      let burger = this.props.error ? (
         <p style={{ textAlign: "center" }}> Ingredients can't be loaded </p>
      ) : (
         <Spinner />
      )

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
                  isAuthenticated={this.props.isAuthenticated}
               />
            </>
         )

         // OrderSummary
         orderSummary = this.props.loading ? (
            <Spinner />
         ) : (
            <OrderSummary
               totalPrice={this.props.totalPrice.toFixed(2)}
               ingredients={this.props.ingredients}
               cancelPurchaseHandler={this.cancelPurchaseHandler}
               continuePurchaseHandler={this.purchaseContinueHandler}
            />
         )
      }

      if (this.props.loading) orderSummary = <Spinner />

      return (
         <>
            <Modal show={this.state.purchasing} cancelPurchaseHandler={this.cancelPurchaseHandler}>
               {orderSummary}
            </Modal>
            {!this.props.loading ? burger : orderSummary}
         </>
      )
   }
}

const mapStateToProps = state => {
   return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      loading: state.burgerBuilder.loading,
      isAuthenticated: state.auth.token !== null,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      addIngredient: ingredientName => dispatch(actions.addIngredient(ingredientName)),
      removeIngredient: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
      initIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance))
