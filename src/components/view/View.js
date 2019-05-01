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
      clicked: false,
      goBack: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  handleIncrease(cartArray) {
    if (cartArray.length === 0) {
      console.log("First Add");
      this.props.select.count = 1;
    } else if (cartArray.length > 0) {
      const selectObjId = this.props.select.id;
      const objIndex = cartArray.findIndex(obj => obj.id === selectObjId);
      if (objIndex === -1) {
        console.log("Adding new");
      } else {
        console.log("function", cartArray);
        console.log("select obj", this.props.select);
        const foundObjIndex = cartArray.findIndex(
          obj => obj.id === this.props.select.id
        );
        console.log("obj found", cartArray[foundObjIndex]);
        this.props.select.count = cartArray[foundObjIndex].count;
      }
    }
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

  handleGoBack() {
    this.setState({
      goBack: true
    });
    this.goToHomePage();
  }

  goToHomePage = () => {
    this.props.history.push("/");
  };

  render() {
    const found = this.props.cart.arr.some(
      item => item.id === this.props.select.id
    );
    console.log("view page", this.props.cart.arr);
    return (
      <div>
        <div className="head-flex">
          <div className="head-left-div">
            <h1>From view Page</h1>
          </div>
          <div className="head-right-div">
            <h2 className="pointer" onClick={() => this.handleClick()}>
              cart items:
              {this.props.cart.arr.length > 0
                ? this.props.cart.arr.length
                : "0"}
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
              onClick={async () => {
                await this.handleIncrease(this.props.cart.arr);
                this.props.addToCart(this.props.select);
              }}
            >
              {found ? "Increase Its Amount In Cart" : "Add To Cart"}
            </button>
            <button className="go-back" onClick={() => this.handleGoBack()}>
              Go Back
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
