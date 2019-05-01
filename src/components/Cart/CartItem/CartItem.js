import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  handleClick = data => {
    console.log(data);
  };

  render() {
    return (
      <div className="cart-flex">
        <div className="cart-left-div">
          <button
            className="button-right"
            onClick={() => {
              this.props.itemToDelete(this.props.data);
            }}
          >
            <i className="fas fa-times" />
          </button>
          <h3>{this.props.data.name}</h3>
          <h3>{this.props.data.info}</h3>
          <h3>{this.props.data.color}</h3>
          <h3>{this.props.data.price}</h3>
          <h3>
            No Of Items:
            <button
              onClick={() => {
                this.props.noOfItems(this.props.data);
                this.forceUpdate();
              }}
            >
              <i className="far fa-minus-square margin-btn" />
            </button>
            {this.props.data.count}
            <button
              onClick={() => {
                this.props.incrementItem(this.props.data);
                this.forceUpdate();
              }}
            >
              <i className="far fa-plus-square margin-btn" />
            </button>
          </h3>
        </div>
        <div className="cart-right-div" />
      </div>
    );
  }
}

export default CartItem;
