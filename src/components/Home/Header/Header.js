import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goToCartPage = this.goToCartPage.bind(this);
  }

  goToCartPage() {
    this.props.history.push("/cart");
  }

  handleClick() {
    this.setState({
      clicked: true
    });
    this.goToCartPage();
  }

  render() {
    return (
      <div className="head-flex position">
        <div className="head-left-div">
          <h1>Listing Of Products</h1>
        </div>
        <div className="head-right-div">
          <h2
            className="pointer"
            onClick={() => {
              this.handleClick();
            }}
          >
            cart items:
            {this.props.cart.arr.length > 0 ? this.props.cart.arr.length : "0"}
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

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Header)
);
