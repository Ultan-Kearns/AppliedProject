import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

class Statements extends React.Component {
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
    axios
      .get(
        "https://localhost:8080/api/statements/" +
          sessionStorage.getItem("username")
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.setState({
            location: res.data[i].location,
            cost: res.data[i].cost,
            name: res.data[i].name,
            date: res.data[i].date
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
          document.getElementById("statements").appendChild(node);
        }
      });
  }

  render() {
    return (
      //statements populating but can't access field
      <div>
        <Helmet>
          <title>Statements</title>
        </Helmet>
        <h1>Your Statements</h1>
        <p>
          You can view statements here : D- maybe have a dropdown to select year
          or month of statement
        </p>
        <ul id="statements" />
      </div>
    );
  }
}

export default Statements;
