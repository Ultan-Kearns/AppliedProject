import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import "../Styles/Login.css";
import Login from "./Login";
import { Helmet } from "react-helmet";
const axios = require("axios").default;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      number: "",
      dob: ""
    };
  }
  redirect(){
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
    //check if user exists
    axios.get("https://localhost:8080/api/getuser/"+this.state.username).then(res => {
      //log res for testing
      console.log(res.data);
      if(res.data != null){
        alert("User already exists")
      }
    });

    console.log(this.state.name, this.state.number, this.state.dob);
    const newUser = { _id: this.state.username, password: this.state.password,name:this.state.name, number:this.state.number, dob:this.state.dob };
     if (this.state.password.length >= 6 && this.state.username !== "" && this.state.name !== "" && this.state.number !== "" && this.state.dob !== "") {
      axios.post("https://localhost:8080/api/users", newUser).then(res => {
      //log res for testing
      console.log(res.data);
     })
  }
  else {
    console.log(this.state.password.length);
    alert("Password must be 6 characters or greater and no fields can be left blank");
  }
    //need to add error messages
    event.preventDefault();
  };
  componentDidMount() {
    axios.get("https://localhost:8080/api/users").then(res => {
      //log res for testing
      console.log(res.data);
    });
    console.log("CHECK")
    axios.get("https://localhost:8080/api/users/test/test").then(res => {
      //log res for testing
      console.log(res.data);
    });
  }
  render() {
    return (
      <div id="root">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <form id="registerForm" onSubmit={this.register}>
          <h1>Register here by entering below</h1>
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
