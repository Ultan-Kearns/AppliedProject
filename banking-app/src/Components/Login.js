import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
import ReactDOM from "react-dom";
import App from "../App";
import Register from "./Register";
import Forgot from "./Forgot";
import Axios from "axios";

class Login extends React.Component {
  //username test
  //password test
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      checkUsername:"",
      checkPassword:""
    };
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  RegisterForm = event =>{
    ReactDOM.render(<Register />, document.getElementById("root"));
    event.preventDefault();

  }
  PassForm = event =>{
    ReactDOM.render(<Forgot />, document.getElementById("root"));
    //stops refresh of page
    event.preventDefault();
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  componentDidMount(){
    //connect to server upon component load
    const axios = require('axios').default;
      //Testing log
      console.log("CHECK USER" + this.state.checkUsername)
      console.log("CHECK PASS " + this.state.checkPassword)
    })
   }
  handleSubmitForm = event => {
    console.log(this.state.username + " " + this.state.checkUsername)
    //check to see if the entered data matches need to find way to make multi user friendly
    if (this.state.username === this.state.checkUsername && this.state.password === this.state.checkPassword) {
      ReactDOM.render(<App />, document.getElementById("root"));
          event.preventDefault();
    } else {
      alert("sorry either user account doesn't exist or the password is wrong");
      return null;
    }
  };
  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h1>Login to experience next generation banking</h1>
        <p>
          Please enter your username and password below and we'll redirect you
          to your account page
        </p>
        <form id="loginForm" onSubmit={this.handleSubmitForm}>
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
            <Button size="sm" id ="buttonReg" onClick={this.RegisterForm}>Register</Button>
            <Button size="sm" id ="buttonPass" onClick={this.PassForm}>Forgot Password</Button>
          <Button variant="primary" id="loginButton" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;
