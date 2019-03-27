import React from "react"
import "./Toolbar.css"
import Logo from "./../../Logo/Logo"
import NavigationItems from "./../NavigationItems/NavigationItems"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar = props => {
   return (
      <header className="Toolbar">
         <DrawerToggle clicked={props.showSideDrawer} />
         <Logo hack={true} />
         <nav className="desktopOnly">
            <NavigationItems isAuthenticated={props.isAuth}/>
         </nav>
         <p style={{ color: "white" }}>V4.0</p>
      </header>
   )
}

export default toolbar
