import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import loading from "../images/lg.curve-bars-loading-indicator.gif";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      amount: "",
      isLoading: false
    };
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.successPage = this.successPage.bind(this);
  }

  saveToDatabase() {
    axios
      .post("http://localhost:5000/checkout", this.props.cart.arr)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  successPage() {
    this.props.history.push("/success");
  }

  handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    try {
      const { token } = await this.props.stripe.createToken({
        name: this.state.name
      });
      const amount = this.state.amount;
      await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ token, amount })
      });
      this.handleRedirect();
    } catch (e) {
      console.log(e);
    }
  };

  handleRedirect = () => {
    this.saveToDatabase();
    this.successPage();
    localStorage.removeItem("state");
  };

  componentDidMount() {
    let amount = 0;
    this.props.cart.arr.map(item => {
      let currentAmount = Number(item.price * item.count, 10);
      console.log(currentAmount);
      return (amount = amount + currentAmount);
    });
    console.log(amount);
    this.setState({
      amount: amount
    });
    return amount;
  }

  render() {
    return (
      <>
        <main className="container Fade">
          <form
            className="form-group mt-3 border border-primary rounded shadow-lg p-3"
            onSubmit={this.handleSubmit}
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="input-group my-1 p-1 border border-dark"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              className="input-group my-1 p-1 border border-dark"
              value={this.state.amount}
              disabled
            />
            <label>CC Number -- Exp. Date -- CVC</label>
            <CardElement className="p-2 border border-dark" />
            <button className="btn btn-primary border border-dark shadow mt-3 mr-1">
              Charge It!
            </button>
            {this.state.isLoading ? (
              <img src={loading} alt="loading" className="loading" />
            ) : (
              ""
            )}
          </form>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer
  };
};

export default withRouter(
  injectStripe(
    connect(
      mapStateToProps,
      null
    )(CheckoutForm)
  )
);
