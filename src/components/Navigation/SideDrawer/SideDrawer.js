import React from "react"
import Logo from "./../../Logo/Logo"
import NavigationItems from "./../NavigationItems/NavigationItems"
import "./SideDrawer.css"
import LogoModule from "../../Logo/Logo.module.css"

const sideDrawer = props => {
   return (
      <div className="SideDrawer">
         <div className={LogoModule.Logo}>
            <Logo />
         </div>
         <nav>
            <NavigationItems />
         </nav>
      </div>
   )
}

export default sideDrawer
