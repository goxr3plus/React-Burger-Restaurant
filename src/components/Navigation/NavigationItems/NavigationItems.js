import React from "react"
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = () => (
   <ul className="NavigationItems">
      <NavigationItem link="/React-Burger-Restaurant" active>
         Burger Builder
      </NavigationItem>
      <NavigationItem link="/React-Burger-Restaurant">Checkout</NavigationItem>
   </ul>
)

export default navigationItems
