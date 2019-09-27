import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import ReactDOM from "react-dom";
import "../Styles/Login.css";
import Login from "./Login";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
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
  handleSubmitForm = event => {
    if (this.state.username === "test" && this.state.password.length > 6) {
    } else {
      alert("sorry either user account doesn't exist or the password is wrong");
      return null;
    }
  };
  render() {
    return (
      <div id="root">
        <form id="registerForm" onSubmit={this.handleSubmitForm}>
          <h1>Register here by entering below</h1>

          <InputGroup className="mb-3" id="username">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
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
          <Button variant="primary" id="login" type="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
