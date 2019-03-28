import React from "react"
import LogoModule from "../../Logo/Logo.module.css"
import Logo from "./../../Logo/Logo"
import Backdrop from "./../../UI/Backdrop/Backdrop"
import NavigationItems from "./../NavigationItems/NavigationItems"
import "./SideDrawer.css"

const sideDrawer = props => {
   let attachedClasses = ["SideDrawer", "Close"]
   if (props.open) {
      attachedClasses = ["SideDrawer", "Open"]
   }
   return (
      <>
         <Backdrop show={props.open} clicked={props.closed} />
         <div className={attachedClasses.join(" ")} onClick={props.closed}>
            <div className={LogoModule.Logo}>
               <Logo />
            </div>
            <nav>
               <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
         </div>
      </>
   )
}

export default sideDrawer
