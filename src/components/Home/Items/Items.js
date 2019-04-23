import React, { Component } from "react";
import "./Items.css";
import Item from "./Item/Item";

class Items extends Component {
  render() {
    return (
      <div className="shopping-contain-main-div">
        <div className="left-side-contain-div">
          <p> Item List </p>
          <Item
            key="1"
            id="1"
            name="iphone 6"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="2"
            id="2"
            name="iphone 6s"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="3"
            id="3"
            name="iphone 7"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="4"
            id="4"
            name="iphone 7 plus"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="5"
            id="5"
            name="iphone 8"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="6"
            id="6"
            name="iphone 8 plus"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="7"
            id="7"
            name="iphone x"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="8"
            id="8"
            name="iphone xs"
            info="64gb"
            color="space grey"
            price="800$"
          />
          <Item
            key="9"
            id="9"
            name="iphone xs max"
            info="64gb"
            color="space grey"
            price="800$"
          />
        </div>
        <div className="right-side-contain-div" />
      </div>
    );
  }
}

export default Items;
