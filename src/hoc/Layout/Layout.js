import React, { Component } from "react"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import { connect } from "react-redux"
import "./Layout.css"

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
            <Toolbar
               showSideDrawer={this.sideDrawerToggleHandler}
               isAuth={this.props.isAuthenticated}
            />
            <SideDrawer
               open={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler}
               isAuth={this.props.isAuthenticated}
            />
            <main className={"Content"}>{this.props.children}</main>
         </>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
   }
}

export default connect(mapStateToProps)(Layout)
