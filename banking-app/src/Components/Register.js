import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
const axios = require("axios").default;
let axiosConfig = {
  headers: {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*",

  }
};
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
    if (this.state.password.length >= 6) {
       event.preventDefault();
    } else {
      console.log(this.state.password.length);
      alert("Password must be 6 characters or greater");
      event.preventDefault();
    }
  };
//need to define models + routes
  register = event =>{
    let username = this.state.username;
    let password = this.state.password;
    const newUser = {username: username ,password: password};
    //this is not getting called
    axios.post('https://localhost:8080/api/users',newUser);
      //for testing delete after
      alert("username " + newUser.username + " Password " + newUser.password);
     event.preventDefault();

  }
  componentDidMount(){
    axios.get("https://localhost:8080/api/users").then(res=>{
      //log res for testing
      console.log(res.data)
     })
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
