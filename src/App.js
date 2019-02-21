import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Layout from "./hoc/Layout/Layout"

class App extends Component {
   render() {
      return (
         <Layout>
            <Switch>
               <Route path="/checkout" component={Checkout} />
               <Route path="/React-Burger-Restaurant" component={BurgerBuilder} />
               <Redirect from="/" to="/React-Burger-Restaurant" />
            </Switch>
         </Layout>
      )
   }
}

export default App
