import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import "../Styles/UserInfoStyle.css";
import "js-sha256";
import FormControl from "react-bootstrap/FormControl";
const axios = require("axios").default;
const sha256 = require("js-sha256");
var password = "";
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newUsername: "",
      password: "",
      number: "",
      prevName: "",
      prevNumber: "",
      prevPassword: "",
      dob: ""
    };
  }
  handleNewUsernameChange = event => {
    this.setState({
      newUsername: event.target.value
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
  update = event => {
    //if any info is blank set to previous info of user
    if (this.state.number === "null" || this.state.number === "") {
      this.setState({
        number: this.state.prevNumber
      });
    }

    if (this.state.name === "null" || this.state.name === "") {
      this.setState({
        name: this.state.prevName
      });
    }
    if (this.state.newUsername === "null" || this.state.newUsername === "") {
      this.setState({
        newUsername: sessionStorage.getItem("email")
      });
    }
    if (this.state.password !== "null" && this.state.password !== "") {
      alert("SHA " + this.state.password);
      this.setState({
        password: sha256(this.state.password)
      });
      alert(this.state.password);
    } else {
      this.setState({
        password: this.state.prevPassword
      });
      alert("PASS WILL = PREV PASS " + this.state.password);

    }

    //hash pass using sha256
    const newUser = {
      _id: this.state.newUsername.toLowerCase(),
      password: this.state.password,
      name: this.state.name,
      number: this.state.number,
      dob: this.state.dob
    };
    if (
      this.state.number.length === 10 &&
      this.state.name.length >= 5 && this.state.password.length >= 5
    ) {
      alert(sessionStorage.getItem("email"));
      //delete original user
       axios
        .delete(
          "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log("ERR");
        });
      //recreate user for ID
      axios
        .post("https://localhost:8080/api/users/", newUser)
        .then(res => {
          //log res for testing
          console.log(res.data);
        })
        .catch(error => {
          console.log("ERR");
        });
        sessionStorage.setItem("email", this.state.newUsername);

      console.log("In update");
      alert("Updated user");
      event.preventDefault();
    } else {
      alert(
        "Form invalid, password length must be greater than 6 and number must have 10 digits and name must be >= 5 characters"
      );
      alert(
        this.state.number +
          " " +
          this.state.password +
          " " +
          this.state.newUsername +
          " " +
          this.state.name +
          " " +
          this.state.dob +
          " LENGTH " +
          " NUM" +
          this.state.number.length +
          "NAME " +
          this.state.name.length +
          " PASS " +
          this.state.password.length
      );
      alert(
        this.state.prevNumber +
          " " +
          this.state.prevPassword +
          " " +
          this.state.username +
          " " +
          this.state.prevName +
          " " +
          this.state.dob +
          " LENGTH " +
          " NUM" +
          this.state.number.length +
          "NAME " +
          this.state.name.length +
          " PASS " +
          this.state.password.length
      );
    }
    event.preventDefault();
  };
  componentDidMount() {
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        var text = document.createTextNode(
          "Name: " +
            res.data.name +
            " Number: " +
            res.data.number +
            " Date of Birth: " +
            res.data.dob +
            " Username: " +
            res.data._id,
          //In case user leaves any information blank just submit their current info

          this.setState({
            prevName: res.data.name
          }),
          this.setState({
            prevNumber: res.data.number
          }),
          this.setState({
            prevPassword: res.data.password
          }),
          this.setState({
            dob: res.data.dob
          })
        );
        password = this.state.password;
        document.getElementById("basic").append(text);
      });
  }
  deleteUser() {
    var answer = window.prompt("Enter password to delete account");
    if (sha256(answer) === password) {
      axios.delete(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      );
      alert("User deleted");
      ReactDOM.render(<Login />, document.getElementById("root"));
    } else {
      alert("Action aborted, password was incorrect");
    }
  }
  render() {
    return (
      <div className="UserInfo">
        <Helmet>
          <title>User Info</title>
        </Helmet>
        <h1>Welcome to the User Info!</h1>
        <p>This page will show user information</p>
        <h2>Basic Info: </h2>
        <p id="basic" />
        <h2>Change Info: </h2>
        <form id="updateForm" onSubmit={this.update}>
          <InputGroup className="mb-3" id="name">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Name"
              aria-label="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </InputGroup>
          <InputGroup className="mb-3" id="username">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              type="email"
              value={this.state.newUsername}
              onChange={this.handleNewUsernameChange}
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
          <InputGroup className="mb-3" id="number">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Number:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Number"
              aria-label="Number"
              type="number"
              value={this.state.number}
              onChange={this.handleNumberChange}
            />
          </InputGroup>
          <Button size="sm" id="updateButton" type="submit">
            Update Information
          </Button>
        </form>
        <h2>Delete account: </h2>
        <p>Click here to delete account</p>
        <Button onClick={this.deleteUser} variant="danger">
          Delete Account
        </Button>
      </div>
    );
  }
}

export default UserInfo;
