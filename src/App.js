import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import View from "./components/view/View";
// package for creating routing in react apps.
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Success from "./components/Success/Success";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { StripeProvider, Elements } from "react-stripe-elements";

const App = () => {
  return (
    <StripeProvider apiKey="Your published key from stripe">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/view" render={() => <View />} />
          <Route path="/cart" render={() => <Cart />} />
          <Route path="/success" component={Success} />
          {/* <Route render={() => <h1>Page not found</h1>} /> */}
          {/* <Route path="/checkout" component={CheckoutForm} /> */}
        </Switch>
        <Elements>
          <Route path="/checkout" component={CheckoutForm} />
        </Elements>
      </Router>
    </StripeProvider>
  );
};

export default App;
