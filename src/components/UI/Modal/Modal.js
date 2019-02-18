import React, { Component } from "react"
import Backdrop from "./../Backdrop/Backdrop"
import "./Modal.css"

class Modal extends Component {
   shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show
   }

   componentWillUpdate(nextProp, nextState) {
      console.log("model will update")
   }

   render() {
      return (
         <>
            <Backdrop show={this.props.show} clicked={this.props.cancelPurchaseHandler} />
            <div
               className={"Modal"}
               style={{
                  transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                  opacity: this.props.show ? "1" : "0",
               }}
            >
               {this.props.children}
            </div>
         </>
      )
   }
}

export default Modal
