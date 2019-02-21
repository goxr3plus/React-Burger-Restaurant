import React from "react"
import "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import { withRouter } from "react-router-dom"

const burger = props => {
   // console.log(props)
   let transformedIngredients = props.ingredients
      .map((igKey,i) => {
         //  console.log("Ig Key :" + igKey)
          return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    
   if (transformedIngredients.length === 0) transformedIngredients = <p>Please start adding ingredients!</p>
   return (
      <div className={"Burger"}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   )
}

export default withRouter(burger)
