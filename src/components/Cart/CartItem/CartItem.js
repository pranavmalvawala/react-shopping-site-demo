import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  render() {
    return (
      <div className="cart-block">
        <h3>{this.props.data.name}</h3>
        <h3>{this.props.data.info}</h3>
        <h3>{this.props.data.color}</h3>
        <h3>{this.props.data.price}</h3>
      </div>
    );
  }
}

export default CartItem;
