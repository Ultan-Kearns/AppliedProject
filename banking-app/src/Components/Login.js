import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
function Login() {
  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>
        Login to experience next generation banking
      </h1>
      <p>
      Please enter your username and password below and we'll
      redirect you to your account page
      </p>
      <form id="loginForm">
        <InputGroup className="mb-3" id="username">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Username" aria-label="Username" />
        </InputGroup>
        <InputGroup className="mb-3" id="password">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Password:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Password" aria-label="Password" type = "password"/>
        </InputGroup>
      </form>
      <Button variant="primary" id="login">
        Login
      </Button>
    </div>
  );
}

export default Login;
