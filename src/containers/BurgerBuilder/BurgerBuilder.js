import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients}/>
        <div> Build Controls 2</div>
      </>
    );
  }
}

export default BurgerBuilder;
