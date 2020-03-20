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
            <form id="supportForm" onSubmit={this.support}>
              <textarea
                placeholder="Enter your bug here"
                maxlength="300"
                minlength="50"
                id="support"
                onChange={this.handleSupportChange}
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
