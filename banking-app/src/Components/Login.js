import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
import ReactDOM from "react-dom";
import App from "../App";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    };
  }

  handleUsernameChange = (event) =>{
    this.setState({
      username: event.target.value,
    });
  }
  handlePasswordChange = (event) =>{
    this.setState({
      password: event.target.value,
    });
  }
  handleSubmitForm = (event) => {
    if(this.state.username === "test" && this.state.password === "test")
    ReactDOM.render(<App />, document.getElementById("root"));

  }
  render(){
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
      <form id="loginForm" onSubmit={this.handleSubmitForm}>
        <InputGroup className="mb-3" id="username">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Username" aria-label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
        </InputGroup>
        <InputGroup className="mb-3" id="password">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Password:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Password" aria-label="Password" type = "password" value={this.state.password} onChange={this.handlePasswordChange}/>
        </InputGroup>
        <Button variant="primary" id="login" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
}
export default Login;
