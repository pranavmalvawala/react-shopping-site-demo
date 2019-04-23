import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";

class Cart extends Component {
  render() {
    return (
      <div>
        <h1>Cart Page</h1>
        <div>
          {this.props.cart.arr.map(item => (
            <CartItem data={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer
  };
};

export default connect(mapStateToProps)(Cart);
