import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
import Card from "react-bootstrap/Card";

import "axios";
import "js-sha256";
import "../Styles/Support.css";
const axios = require("axios").default;

class Support extends React.Component {
  //username test
  //password test
  constructor(props) {
    super(props);
    this.state = {
      supportMessage: ""
    };
  }
  handleSupportChange = event => {
    this.setState({
      supportMessage: event.target.value
    });
  };
  handleSubmitForm = event =>{
    var d = new Date();
    const Support = {
      email: sessionStorage.getItem("email"),
      bug: this.state.supportMessage,
      date: d,
      status: "Open"
    }
    axios.post("https://localhost:8080/api/support",Support)
    alert("Bug submitted our team will be right on it!")
    document.getElementById("support").value= ""
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Support</title>
        </Helmet>
        <h1>
          Welcome to the support page!
        </h1>
        <p>
          Here at independent banking you are our top priority excluding money
          of course, so just enter the problem you're having below and hit the submit button
          and we'll get
          right on it
        </p>
        <Card>
          <Card.Header>Support Form</Card.Header>
          <Card.Body>
            <form id="supportForm" onSubmit={this.handleSubmitForm}>
              <textarea
                placeholder="Enter your bug here"
                maxLength="300"
                minLength="50"
                id="support"
                onChange={this.handleSupportChange}
                value={this.state.supportMessage}
              />

              <br />
              <Button type="submit" id="submit">
                Submit issue to our team
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default Support;
