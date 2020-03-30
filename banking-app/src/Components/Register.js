import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import "../Styles/Login.css";
import Login from "./Login";
import { Helmet } from "react-helmet";
import "js-sha256";
const axios = require("axios").default;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      number: "",
      dob: "",
      balance: ""
    };
  }
  redirect() {
    ReactDOM.render(<Login />, document.getElementById("root"));
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };
  handleNumberChange = event => {
    this.setState({
      number: event.target.value
    });
  };
  handleDobChange = event => {
    this.setState({
      dob: event.target.value
    });
  };
  register = event => {
    var birth = new Date(this.state.dob);
    var now = new Date();
    // this gets date in years the result of the subtraction of variables is in ms
    var age =  Math.abs((now - birth) / 31557600000)
    //create IBAN here and BIC
    console.log(this.state.name, this.state.number.substring(1,10), this.state.dob);
    const sha256 = require("js-sha256");
    //hash pass using sha256
    const hashed = sha256(this.state.password);
    alert(this.state.number.substring(1,10))
    var number = this.state.number.substring(1,10)

  const newUser = {
      _id: this.state.username,
      password: hashed,
      name: this.state.name,
      number: "+353" + number,
      dob: this.state.dob,
      bic: "1",
      iban: "1",
      balance: "20"
    };
    if (
      this.state.number.length === 10 &&
      this.state.name.length >= 5 &&
      this.state.password.length >= 6 &&
      this.username !== null &&
      this.state.dob !== "" && age >= 18
    ) {
      //check if user exists
      axios
        .get("https://localhost:8080/apiusers/" + this.state.username)
        .then(res => {
          //log res for testing
          console.log(res.data);
          if (res.data !== "null") {
            alert("User already exists, cannot register");
          }
        })
        .then(res => {
          axios
            .post("https://localhost:8080/apiusers", newUser)
            .then(res => {

            })
            .catch(error => {
              alert("Couldn't register check internet");
              return;
            });
        });
      alert("User created, now you can login :D");
      ReactDOM.render(<Login />, document.getElementById("root"));
    } else {
      alert(
        "Form invalid, password length must be greater than 6 and number must have 10 digits and name must have 5 or more characters and dob cannot be null and user must be 18 or older"
      );
    }
    event.preventDefault();
  };
  componentDidMount() {}
  render() {
    return (
      <div id="root">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <form id="registerForm" onSubmit={this.register}>
          <h1>Register here by entering information below</h1>
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
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </InputGroup>
          <InputGroup className="mb-3" id="name">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Full Name:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Name"
              aria-label="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </InputGroup>
          <InputGroup className="mb-3" id="number">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Phone number:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Number"
              aria-label="Number"
              type="text"
              value={this.state.number}
              onChange={this.handleNumberChange}
            />
          </InputGroup>
          <InputGroup className="mb-3" id="dob">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                Date of birth:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="DOB"
              aria-label="DOB"
              type="date"
              value={this.state.dob}
              onChange={this.handleDobChange}
            />
          </InputGroup>
          <Button variant="primary" id="buttonLeft" onClick={this.redirect}>
            Back
          </Button>
          <Button variant="primary" id="buttonRight" type="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
