import React from "react"
import "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import { withRouter } from "react-router-dom"

const burger = props => {
   let transformedIngredients = props.ingredients.map((ingredient, i) => {
      return <BurgerIngredient key={ingredient + i} type={ingredient} />
   })

   if (transformedIngredients.length === 0) transformedIngredients = <p style={{ textAlign: "center" }}>Empty!</p>
   return (
      <div className={props.classy == null ? "Burger" : "Burger2"}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   )
}

export default withRouter(burger)
