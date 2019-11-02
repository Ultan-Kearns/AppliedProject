import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
import Login from "./Login";

const axios = require("axios").default;
class Forgot extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleSubmitForm = event =>{
    console.log(this.state.username)
    axios.get("https://localhost:8080/api/users/" + this.state.username).then(res=>{
      console.log(res.data)
    });
    alert("email sent to  " + this.state.username);
    ReactDOM.render(<Login />, document.getElementById("root"));
    event.preventDefault();
  }
  componentDidMount() {
    //connect to server and get statements upon component load
  }
  render() {
    return (
      <div id="root">
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <h1>Forgot your password?</h1>
        <p>
          Enter your username here and hit the submit button and we'll send you
          an email with your password
        </p>
        <form id="passwordForm" onSubmit={this.handleSubmitForm}>
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
          <Button variant="primary" id="login" type="submit">
            Send E-mail
          </Button>
        </form>
      </div>
    );
  }
}

export default Forgot;
