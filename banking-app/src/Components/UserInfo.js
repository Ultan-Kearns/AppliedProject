import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup"
import "../Styles/UserInfoStyle.css"

import FormControl from "react-bootstrap/FormControl"
const axios = require("axios").default;

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      username:"",
      password:"",
      number:"",
    }
  }
  componentDidMount() {
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        var text = document.createTextNode(
          "Name: " +
            res.data.name +
            " Number: " +
            res.data.number +
            " Date of Birth: " +
            res.data.dob
        );
        document.getElementById("basic").append(text);
      });
  }
  deleteUser() {
    axios.delete(
      "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
    );
    alert("User deleted");
    ReactDOM.render(<Login />, document.getElementById("root"));
  }
  render() {
    return (
      <div className="UserInfo">
        <Helmet>
          <title>User Info</title>
        </Helmet>
        <h1>Welcome to the User Info!</h1>
        <p>This page will show user information</p>
        <h2>Basic Info: </h2>
        <p id="basic" />
        <h2>Change Info: </h2>
        <form id="updateForm">
        <InputGroup className="mb-3" id="name">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Name"
            aria-label="Name"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3" id="username">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            type="email"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3" id="password">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Password:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Password"
            aria-label="Password"
            type="passwords"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </InputGroup>
        <InputGroup className="mb-3" id="number">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Number:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Number"
            aria-label="Number"
            type="text"
            value={this.state.number}
            onChange={this.handleNumberChange}
          />
          </InputGroup>
          <Button size="sm" id="updateButton" type="submit">
            Update Information
          </Button>
        </form>
        <h2>Delete account: </h2>
        <p>Allow user to delete account</p>
        <Button onClick={this.deleteUser} variant="danger">Delete Account</Button>
      </div>
    );
  }
}

export default UserInfo;
