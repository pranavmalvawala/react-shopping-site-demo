import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem/CartItem";
import { withRouter } from "react-router-dom";
import "./Cart.css";
import itemToDelete from "../../actions/deleteAction";
import removeAll from "../../actions/removeAll";
import swal from "sweetalert";
import updateItemDecrement from "../../actions/updateAction";
import updateItemIncrement from "../../actions/incrementAction";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      cartClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  handleCartClick() {
    this.setState({
      cartClicked: true
    });
  }

  handleClick() {
    this.setState({
      clicked: true
    });

    this.props.history.push("/checkout");
  }

  render() {
    return (
      <div>
        {this.props.cart.arr.length > 0 ? (
          <div>
            <div className="cart-head-flex">
              <div className="left-head-flex">
                <h1>Cart Page</h1>
              </div>
              <div className="right-head-flex">
                <h2 className="pointer" onClick={() => this.handleCartClick()}>
                  cart items:
                  {this.props.cart.arr.length > 0
                    ? this.props.cart.arr.length
                    : "0"}
                </h2>
              </div>
            </div>

            <div>
              {this.props.cart.arr.map(item => (
                <CartItem
                  data={item}
                  key={item.id}
                  itemToDelete={data => this.props.itemToDelete(data)}
                  noOfItems={itemToChange =>
                    this.props.updateItemDecrement(itemToChange)
                  }
                  incrementItem={itemToChange =>
                    this.props.updateItemIncrement(itemToChange)
                  }
                />
              ))}
            </div>
            <button
              className="checkout"
              onClick={() => {
                this.handleClick();
              }}
            >
              Checkout
            </button>
            <button
              className="remove-all"
              onClick={async () => {
                await swal({
                  title: "Are you sure?",
                  icon: "warning",
                  dangerMode: true,
                  buttons: true
                }).then(willDelete => {
                  if (willDelete) {
                    this.props.removeAll(this.props.cart.arr);
                  }
                });
              }}
            >
              Remove All
            </button>
            <button
              className="go-back"
              onClick={() => this.props.history.push("/view")}
            >
              Go Back
            </button>
          </div>
        ) : (
          <div>
            <h1>Cart is empty</h1>
            <button
              className="go-back"
              onClick={() => this.props.history.push("/view")}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemToDelete: itemdata => {
      dispatch(itemToDelete(itemdata));
    },
    removeAll: itemArray => {
      dispatch(removeAll(itemArray));
    },
    updateItemDecrement: itemToUpdate => {
      dispatch(updateItemDecrement(itemToUpdate));
    },
    updateItemIncrement: itemToUpdate => {
      dispatch(updateItemIncrement(itemToUpdate));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
