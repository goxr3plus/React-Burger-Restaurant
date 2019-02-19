import React, { Component } from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import "./Layout.css";

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
