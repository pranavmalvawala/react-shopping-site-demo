import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <div className="head-flex">
        <div className="head-left-div">
          <h1>Listing Of Products</h1>
        </div>
        <div className="head-right-div">
          <h2>
            cart items:
            {this.props.cart.arr.length > 0
              ? this.props.cart.arr.length
              : "empty"}
          </h2>
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

export default connect(mapStateToProps)(Header);
