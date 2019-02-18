import React from "react"
import "./Layout.css"
import Toolbar from "./../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import { Component } from "react"

class Layout extends Component {
   state = {
      showSideDrawer: false,
   }

   sideDrawerClosedHandler = () => {
      this.setState({ showSideDrawer: false })
   }

   sideDrawerToggleHandler = () => {
      this.setState(prevState => {
         return { showSideDrawer: !this.state.showSideDrawer }
      })
   }

   render() {
      return (
         <>
            <Toolbar showSideDrawer={this.sideDrawerToggleHandler} />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={"Content"}>{this.props.children}</main>
         </>
      )
   }
}

export default Layout
