import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import "../Styles/Login.css";
import { Helmet } from "react-helmet";
import Login from "./Login";

const axios = require("axios").default;
const sha256 = require("js-sha256");
class Forgot extends React.Component {
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

  handleSubmitForm = event => {
    console.log(this.state.username);
    if (this.state.username === "") {
      alert("Email cannot be blank");
      event.preventDefault();
      return;
    }
    else{
    var plaintext = ""
    for(var i = 0; i < 20; i++)
    {
      //generate 20 random numbers for password
      plaintext += Math.floor(10 * Math.random())
    }
    var changeCode = ""
    for(var i = 0; i < 4; i++)
    {
      //generate 4 random numbers for change code
      changeCode += Math.floor(10 * Math.random())
    }

    const hashed = sha256(plaintext)
    const rand = {password: hashed}
    var inputNumber
        inputNumber = window.prompt("Please enter your phone number and we will send you your password via text and email")
        axios.get("https://34.68.75.97:8080/api/users/" + inputNumber + "/" + changeCode).then(res=>{
          alert("SENT CODE")
          var answer = window.prompt("Enter 4 digit code that was sent to your phone to confirm password change:")
          if(answer != changeCode){
            alert("Wrong code entered password will not be changed")
            throw new Error("invalid code entered")
          }
          else{
            alert("We will text you and email you your new password")
          }
        }).then(res=>{    axios.get("https://34.68.75.97:8080/api/users/" + inputNumber + "/" + plaintext).then(res=>{
            })
        }).then(res=>{
          axios.get("https://34.68.75.97:8080/api/emailuser/" + this.state.username + "/" + plaintext)
            .then(res => {
              console.log(res.data);
            });
        }).then(res=>{
          axios.post("https://34.68.75.97:8080/api/users/" +this.state.username +  "/rand",rand).then(res=>{
            console.log(res)
          })

        }).catch(error=>{
          alert("Something went wrong: " + error)
        })
        event.preventDefault();
}
}
  componentDidMount() {
    //connect to server and get statements upon component load
  }
  redirect() {
    ReactDOM.render(<Login />, document.getElementById("root"));
  }
  render() {
    return (
      <div id="root">
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <h1>Forgot your password?</h1>
        <p>
          Enter your username here and hit the send email button and we'll send you
          an email with your new password
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
          <Button variant="primary" id="buttonLeft" onClick={this.redirect}>
            Back
          </Button>
          <Button variant="primary" id="buttonRight" type="submit">
            Send E-mail
          </Button>
        </form>
      </div>
    );
  }
}

export default Forgot;
