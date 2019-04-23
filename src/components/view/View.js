import React, { Component } from "react";
import "./View.css";
import img from "../../images/download.jpeg";
import { connect } from "react-redux";
import addToCart from "../../actions/cartAction";
import { withRouter } from "react-router-dom";

export class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true
    });
    this.goToCartPage();
  }

  goToCartPage = () => {
    this.props.history.push("/cart");
  };

  render() {
    console.log(this.props.cart.arr.length);
    return (
      <div>
        <div className="head-flex">
          <div className="head-left-div">
            <h1>From view Page</h1>
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

        <div className="flex">
          <div className="left-side">
            <img src={img} alt="display piece" />
          </div>
          <div className="right-side">
            <p className="align">
              <strong>Product Name: </strong>
              {this.props.select.name}
            </p>
            <p className="align">
              <strong>Storage: </strong>
              {this.props.select.info}
            </p>
            <p className="align">
              <strong>Color: </strong>
              {this.props.select.color}
            </p>
            <p className="align">
              <strong>Price: </strong>
              {this.props.select.price}
            </p>
            <button
              onClick={() => {
                this.props.addToCart(this.props.select);
                this.handleClick();
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    select: state.selectReducer,
    cart: state.cartReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: itemData => {
      dispatch(addToCart(itemData));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(View)
);
