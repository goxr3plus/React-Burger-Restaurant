import React from "react"
import "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = props => {
   const transformedIngredients = Object.keys(props.ingredients)
      .map(igKey => {
         console.log("Ig Key :" + igKey)
         return [...Array(props.ingredients[igKey])].map((_, i) => {
            console.log("Ig Key +i :" + igKey + i)
            return <BurgerIngredient key={igKey + i} type={igKey} />
         })
      })
      .reduce((arr, el) => {
         return arr.concat(el)
      })
   return (
      <div className={"Burger"}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   )
}

export default burger
