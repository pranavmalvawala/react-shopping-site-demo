import React, { Component } from "react";
import "./Items.css";
import Item from "./Item/Item";
import InfiniteScroll from "react-infinite-scroller";
import qwest from "qwest";

const api = {
  baseUrl: "http://localhost:5000/data"
};

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      hasMoreItems: true,
      nextCall: null
    };
    this.loadItems = this.loadItems.bind(this);
  }

  loadItems = page => {
    var that = this;
    console.log(page);
    let url = api.baseUrl + "/" + page;
    console.log(url);
    qwest
      .get(url, {
        cache: true
      })
      .then(function(xhr, resp) {
        if (resp) {
          let dataFromResponse = [];

          resp.result.map(obj => {
            return dataFromResponse.push(obj);
          });
          if (page > 5) {
            this.setState({
              hasMoreItems: false
            });
          } else {
            that.setState({
              data: dataFromResponse
            });
          }
        }
      });
  };

  render() {
    let items = [];
    this.state.data.map((item, i) => {
      return items.push(item);
    });

    return (
      <div className="shopping-contain-main-div">
        <div className="left-side-contain-div  position-margin">
          <p> Item List </p>
          <InfiniteScroll
            key={1}
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={this.state.hasMoreItems}
          >
            {items.map(each => (
              <Item
                key={each.key}
                id={each.id}
                name={each.name}
                info={each.info}
                color={each.color}
                price={each.price}
              />
            ))}
          </InfiniteScroll>
        </div>
        <div className="right-side-contain-div" />
      </div>
    );
  }
}

export default Items;
