import React, { Component } from "react";
import "./Item.css";
import clickedItem from "../../../../actions/selectAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Item extends Component {
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
    this.goToViewPage();
  }

  goToViewPage = () => {
    this.props.history.push("/view");
  };

  render() {
    return (
      <div
        className="block"
        onClick={() => {
          this.props.clickedItem(this.props);
          this.handleClick();
        }}
      >
        <div className="left">
          <div className="common-flex-div">
            <p className="space">{this.props.name}</p>
            <p> {this.props.info}</p>
          </div>
        </div>
        <div className="middle">
          <p>{this.props.color}</p>
        </div>
        <div className="right">
          <p>{this.props.price}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    select: state.selectReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickedItem: itemData => {
      dispatch(clickedItem(itemData));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Item)
);
