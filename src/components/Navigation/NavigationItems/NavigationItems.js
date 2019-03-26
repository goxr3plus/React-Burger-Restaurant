import React from "react"
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = () => (
   <ul className="NavigationItems">
      <NavigationItem link="/" exact>
         Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">My Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
   </ul>
)

export default navigationItems
