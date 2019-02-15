import React from "react"
import "./Modal.css"
import Backdrop from "./../Backdrop/Backdrop"

const modal = props => (
   <>
      <Backdrop show={props.show} clicked={props.cancelPurchaseHandler}/>
      <div
         className={"Modal"}
         style={{ transform: props.show ? "translateY(0)" : "translateY(-100vh)", opacity: props.show ? "1" : "0" }}
      >
         {props.children}
      </div>
   </>
)

export default modal
