import React, { Component } from "react";
import Layout from "./components/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Burger from './components/Burger/Burger';

class App extends Component {
  render() {
    return (
      <Layout>
        <Burger></Burger>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    );
  }
}

export default App;
