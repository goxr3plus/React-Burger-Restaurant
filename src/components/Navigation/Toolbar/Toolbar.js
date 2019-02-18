import React from "react"
import "./Toolbar.css"
import Logo from "./../../Logo/Logo"
import NavigationItems from "./../NavigationItems/NavigationItems"

const toolbar = props => {
   return (
      <header className="Toolbar">
         <div>Menu</div>
         <Logo />
         <nav className="DesktopOnly">
            <NavigationItems />
         </nav>
      </header>
   )
}

export default toolbar
