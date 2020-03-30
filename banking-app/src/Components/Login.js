import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import "../Styles/Login.css"
import { Helmet } from "react-helmet"
import ReactDOM from "react-dom"
import Home from "./Home.js"
import Nav from "./Nav.js"

import Register from "./Register"
import Forgot from "./Forgot"
import "axios"
import "js-sha256"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      checkUsername: "",
      checkPassword: ""
    }
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }
  RegisterForm = event => {
    ReactDOM.render(<Register />, document.getElementById("root"))
    event.preventDefault()
  }
  PassForm = event => {
    ReactDOM.render(<Forgot />, document.getElementById("root"))
    //stops refresh of page
    event.preventDefault()
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }
  componentDidMount() {
    //if(sessionStorage.getItem("username") !=="null" && sessionStorage.getItem("username") !== null){
    //ReactDOM.render(<App />, document.getElementById("root"))
    //this stops context menu being used in app reference: https:/www.w3schools.com/jsref/event_oncontextmenu.asp
    document.addEventListener("contextmenu", function(e) {
      e.preventDefault()
    })
  }
  generateRandom() {
    var random = ""
    for (var i = 0; i < 10; i++) {
      random += Math.floor(10 * Math.random())
    }
    return random
  }
  handleSubmitForm = event => {
    const axios = require("axios").default
    const sha256 = require("js-sha256")
    const random = this.generateRandom()
    axios
      .get(
        "https://localhost:8080/api/users/" +
          this.state.username.toLowerCase() +
          "/" +
          sha256(this.state.password) +
          "/" +
          random
      )
      .then(function(res) {
        if (res.data !== "null") {
          //do axios.get in here
          sessionStorage.setItem("username", res.data.name)
          sessionStorage.setItem("email", res.data._id)
          sessionStorage.setItem("number", res.data.number)
          var answer = ""
          //for extra security
          var wrongCount = 0
          // saves money for twillio when I keep asking user for answer rather than send tonnes of sms
          while (answer != null) {
            answer = window.prompt("Enter 2fa code sent to your phone")
            if (answer === random) {
              ReactDOM.render(<Nav />, document.getElementById("root"))
              break;
            } else {
              alert("Wrong code entered, try again")
              wrongCount++
            }
            if(wrongCount === 3){
              alert("Please try logging in again, wrong code entered 3 times")
              break
            }
          }
        } else if (res.data === "null") {
          alert("Wrong username or password")
        } else if (res.data == null) {
          alert("Error logging in")
        }
      })
      .catch(error => {
        alert("Unexpected error: " + error)
      })

    event.preventDefault()
  }
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
          <Button size="sm" id="buttonLeft" onClick={this.RegisterForm}>
            Register
          </Button>
          <Button size="sm" id="buttonRight" onClick={this.PassForm}>
            Forgot Password
          </Button>
          <Button variant="primary" id="loginButton" type="submit">
            Login
          </Button>
        </form>
      </div>
    )
  }
}
export default Login
