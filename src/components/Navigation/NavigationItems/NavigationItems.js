import React from "react"
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = props => (
   <ul className="NavigationItems">
      <NavigationItem link="/" exact>
         Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
      {props.isAuthenticated ? (
         <NavigationItem link="/logout">Log Out</NavigationItem>
      ) : (
         <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
   </ul>
)

export default navigationItems
