import React from "react"
import "./Layout.css"
import Toolbar from "./../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import { Component } from "react"

class Layout extends Component {
   state = {
      showSideDrawer: true,
   }

   sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false })
   }

   render() {
      return (
         <>
            <Toolbar />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={"Content"}>{this.props.children}</main>
         </>
      )
   }
}

export default Layout
