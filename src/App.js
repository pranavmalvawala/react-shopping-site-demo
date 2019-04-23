import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import View from "./components/view/View";
// package for creating routing in react apps.
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/view" component={View} />
        <Route path="/cart" component={Cart} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
