import React from "react"
import burgerLogo from "../../assets/Images/burger-logo.png"
import "./Logo.css"

const Logo = props => {
   let logo = props.hack === undefined ? (
      <div className="Logo">
         <img src={burgerLogo} alt="My Burger" />
      </div>
   ) : (
      <div className="Logo desktopOnly">
         <img src={burgerLogo} alt="My Burger" />
      </div>
   )
   return logo
}

export default Logo
