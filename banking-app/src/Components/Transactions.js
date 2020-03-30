import React from "react";
import "axios";
import { Helmet } from "react-helmet";
import "react-bootstrap/Button";
import "../Styles/TransactionStyle.css";
import Card from "react-bootstrap/Card";

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
        "https://localhost:8080/apitransactions/" +
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
          var node = document.createElement("p");
          var br = document.createElement("BR");
          var locationText = document.createTextNode(
            "Location: " + this.state.location
          );
          var costText = document.createTextNode("Cost: €" + this.state.cost);
          var nameText = document.createTextNode("Name: " + this.state.name);
          var dateText = document.createTextNode("Date: " + this.state.date);
          if(i % 2 === 0){
          node.id = "transactionEven";
        }
        else{
          node.id = "transactionOdd"
        }
          node.append(locationText);
          node.append(br);
          node.append(br.cloneNode());

          node.append(costText);
          node.append(br.cloneNode());
          node.append(br.cloneNode());

          node.append(nameText);
          node.append(br.cloneNode());
          node.append(br.cloneNode());

          node.append(dateText);

          document.getElementById("transactions").appendChild(node);
        }
      })
      .catch(error => {
        alert("Can't get transactions issue connecting to server");
      });
  }

  render() {
    return (
      //transactions populating but can't access field
      <div>
        <Helmet>
          <title>Transactions</title>
        </Helmet>
        <h1>Your transactions</h1>
        <Card>
          <Card.Header>List of Transactions</Card.Header>
          <Card.Body>
            <Card.Text id="transactions" />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Transactions;
