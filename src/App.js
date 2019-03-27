import React, { Component } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
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
      return (
         <Layout>
            <Switch>
               <Route path="/auth" component={Auth} />
               <Route path="/orders" component={Orders} />
               <Route path="/logout" component={Logout} />
               <Route path="/checkout" component={Checkout} />
               <Route path="/" exact component={BurgerBuilder} />
               <Route render={() => <h1> 404 PAGE NOT FOUND </h1>} />

               {/* <Redirect from="/" to="/React-Burger-Restaurant" /> */}
            </Switch>
            {/*

            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} /> */}
         </Layout>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      tryAutoSignUp: () => dispatch(actions.authCheckState()),
   }
}

export default withRouter(
   connect(
      null,
      mapDispatchToProps
   )(App)
)
