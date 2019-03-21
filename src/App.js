import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Layout from "./hoc/Layout/Layout"
import Orders from "./containers/Orders/Orders"

class App extends Component {
   render() {
      return (
         <Layout>
            <Switch>
               <Route path="/orders" component={Orders} />
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

export default App
