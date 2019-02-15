import React from "react"
import burgerLogo from "../../assets/Images/burger-logo.png"
import "./Logo.css"

const Logo = () => (
   <div className="Logo">
      <img src={burgerLogo} alt="My Burger" />
   </div>
)

export default Logo
