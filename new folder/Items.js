import React, { Component } from "react";
import "./Items.css";
import Item from "./Item/Item";
import qwest from "qwest";
import Pagination from "react-js-pagination";

const api = {
  baseUrl: "http://localhost:5000/data"
};

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      activePage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`Active page number is ${pageNumber}`);
    this.setState({
      activePage: pageNumber
    });
    var that = this;
    console.log(pageNumber);
    let url = api.baseUrl + "/" + pageNumber;
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

          that.setState({
            data: dataFromResponse
          });
        }
      });
  }

  componentDidMount() {
    this.callBackEndAPI()
      // calling this function - defined below
      .then(res => {
        this.setState({ data: res.result });
        // response data from server gets saved in state here
      })
      .catch(err => console.log(err));
    // error gets logged if there was a problem in getting data from server
  }

  callBackEndAPI = async () => {
    // function to make a call to server
    const response = await fetch("http://localhost:5000/data/1");
    // port on which data is hosted
    const body = await response.json();
    // body contains the data to be saved
    if (response.status === 200) {
      return body;
    }
    throw Error(body.message);
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

          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={50}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>

        <div className="right-side-contain-div" />
      </div>
    );
  }
}

export default Items;
