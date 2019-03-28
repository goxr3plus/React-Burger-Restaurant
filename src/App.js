import React, { Component } from "react"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Layout from "./hoc/Layout/Layout"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"
import { connect } from "react-redux"
import * as actions from "./store/actions/index"

class App extends Component {
   componentDidMount() {
      this.props.tryAutoSignUp()
   }

   render() {
      let routes = (
         <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
         </Switch>
      )

      if (this.props.isAuthenticated) {
         routes = (
            <Switch>
               <Route path="/checkout" component={Checkout} />
               <Route path="/orders" component={Orders} />
               <Route path="/logout" component={Logout} />
               <Route path="/auth" component={Auth} />
               <Route path="/" exact component={BurgerBuilder} />
               <Route
                  render={() => (
                     <h1 style={{ textAlign: "center" }}>
                        <strong>404 PAGE NOT FOUND </strong>
                     </h1>
                  )}
               />
               <Redirect from="/" to="/React-Burger-Restaurant" />

               {/* <Redirect from="/" to="/React-Burger-Restaurant" /> */}
            </Switch>
         )
      }

      return <Layout>{routes}</Layout>
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      tryAutoSignUp: () => dispatch(actions.authCheckState()),
   }
}

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(App)
)
