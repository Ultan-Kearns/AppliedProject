import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button"


class Transactions extends React.Component {
  //maybe create statemnt when sending money from home
  constructor(props) {
    super(props);
    this.state = {
      cost: "",
      location: "",
      name: "",
      date: ""
    };
  }
  componentDidMount() {
    const axios = require("axios").default;
    //use email instead
    axios
      .get(
        "https://localhost:8080/api/transactions/" +
          sessionStorage.getItem("email")
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.setState({
            location: res.data[i].location,
            cost: res.data[i].cost,
            name: res.data[i].name,
            date: res.data[i].date,
            email: res.data[i].email
          });
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI");
          var text = document.createTextNode(
            "Location: " +
              this.state.location +
              ", Cost: " +
              this.state.cost +
              ", Name: " +
              this.state.name +
              ", Date: " +
              this.state.date
          );
          node.append(text);
          document.getElementById("transactions").appendChild(node);
        }
      });
  }

  render() {
    return (
      //transactions populating but can't access field
      <div>
        <Helmet>
          <title>transactions</title>
        </Helmet>
        <h1>Your transactions</h1>
        <p>
          You can view transactions here : D- maybe have a dropdown to select year
          or month of statement
        </p>
        <ul id="transactions" />
      </div>
    );
  }
}

export default Transactions;
