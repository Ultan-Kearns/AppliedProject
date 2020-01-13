import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

var statements = [];
var test = "";
class Statements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: "",
      location: "",
      name: ""
    };
  }
  componentDidMount() {
    const axios = require("axios").default;
    axios.get("https://localhost:8080/api/statements").then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.setState({
          location: res.data[i].location,
          cost: res.data[i].cost,
          name: res.data.name,
        });
        statements[i] = {
          location: res.data[i].location,
          cost: res.data[i].cost,
          name: res.data[i].name
        };
        console.log(statements[i].location);
        document.getElementById("statements").textContent += "Location " + statements[i].location +  " " + statements[i].cost + " Name: " + statements[i].name + ""
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
        <div id="statements">
        </div>
      </div>
    );
  }
}

export default Statements;
