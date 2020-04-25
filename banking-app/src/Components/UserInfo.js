import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import ReactDOM from "react-dom";
import InputGroup from "react-bootstrap/InputGroup";
import "../Styles/UserInfoStyle.css";
import "js-sha256";
import FormControl from "react-bootstrap/FormControl";
import { getOpenLoans } from "../Services/LoanHelpers.js";
import Card from "react-bootstrap/Card";

const axios = require("axios").default;
const sha256 = require("js-sha256");
var password = "";
var updates = 0;
//issues when updating 3 times so limiting users updates
sessionStorage.setItem("updates", updates);
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newUsername: "",
      username: sessionStorage.getItem("email"),
      password: "",
      number: "",
      prevName: "",
      prevNumber: "",
      prevPassword: "",
      dob: sessionStorage.getItem("dob"),
      balance: sessionStorage.getItem("balance")
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
  //for updating user info
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
      this.setState({
        password: sha256(this.state.password)
      });
      alert("Updating password please remember this");
    } else {
      this.setState({
        password: this.state.prevPassword
      });
      alert("Password will not be changed " + this.state.password);
    }
    if (
      this.state.dob === "null" ||
      this.state.dob === undefined ||
      this.state.dob === ""
    ) {
      this.setState({
        dob: sessionStorage.getItem("dob")
      });
    }
    //these fields are not edited in this component so will a lways remain the same.
    sessionStorage.setItem("dob", this.state.dob);
    sessionStorage.setItem("balance", this.state.balance);
    this.setState({
      balance: sessionStorage.getItem("balance"),
      dob: sessionStorage.getItem("dob")
    });
    var number = this.state.number.substring(1,10)

    const newUser = {
      _id: this.state.newUsername.toLowerCase(),
      password: this.state.password,
      name: this.state.name,
      number: this.state.number,
      dob: this.state.dob,
      balance: 20,
      iban: "",
      bic: ""
    };
    //problem with axios not being asynchronous may find a different way to handle this
    const CancelToken = axios.CancelToken;
    let cancel;
    try {
      if (
        this.state.number.length === 13 &&
        this.state.name.length >= 5 &&
        this.state.password.length >= 5
      ) {
        var isCancelled = false;
        axios
          .get("https://34.68.75.97:8080/api/users/" + newUser._id)
          .then(res => {
   
            if (res.data === "null") {
              alert(
                "Changing ID, you will now have to login using " +
                  newUser._id +
                  " as email"
              );
            } else if (
              res !== "null" &&
              this.state.username !== this.state.newUsername
            ) {
              //check if response is not null then check to see if the user is using their current username
              alert("Cannot use this email, already registered");
              //taken from axios documentation
              cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
              });
              cancel();
              isCancelled = true;
            }
          })
          .then(res => {
            if (isCancelled === false) {
              //delete original user
              axios
                .delete(
                  "https://34.68.75.97:8080/api/users/" +
                    sessionStorage.getItem("email")
                )
                .then(res => {})
                .catch(error => {
                  console.log("ERR");
                });
              //recreate user for ID - for some reason it clones
              axios
                .post("https://34.68.75.97:8080/api/users/", newUser)
                .then(res => {
                  //log res for testing
                  console.log(res.data);
                })
                .catch(error => {
                  console.log("ERR");
                });
              axios
                .post(
                  "https://34.68.75.97:8080/api/transactions/" +
                    sessionStorage.getItem("email") +
                    "/" +
                    this.state.newUsername
                )
                .then(res => {
                  console.log(
                    "TESTING UPDATE TRANSACTION" + JSON.stringify(res.data)
                  );
                })
                .catch(error => {
                  console.log("Error with transactions");
                });

              axios
                .post(
                  "https://34.68.75.97:8080/api/loans/" +
                    sessionStorage.getItem("email") +
                    "/" +
                    this.state.newUsername
                )
                .then(res => {
                  sessionStorage.setItem("email", this.state.newUsername);
                  alert(
                    "Updated user " +
                      this.state.newUsername +
                      " Bal " +
                      this.state.balance
                  );
                  this.setState({
                    username: this.newUsername
                  });
                })
                .then(res => {
                  if (parseInt(sessionStorage.getItem("updates")) === 2) {
                    alert("You cannot update so much");
                  } else {
                    document.getElementById("basic").innerHTML =
                      "Name: " +
                      this.state.name + "<br/>" + "<br/>" +
                      " Number: " +
                      this.state.number + "<br/>" + "<br/>" +
                      " Date of Birth: " +
                      this.state.dob + "<br/>" + "<br/>" +
                      " Username: " +
                      this.state.newUsername + "<br/>" + "<br/>" +
                      " Balance: €" +
                      this.state.balance;
                    updates++;
                    sessionStorage.setItem("updates", updates);
                  }
                })
                .catch(error => {
                  console.log("Error with loans");
                });
            }
          })
          .catch(error => {
            alert("Cannot update user connection error " + error);
          });
        event.preventDefault();
      } else {
        alert(
          "Form invalid, password length must be greater than 6 and number must have 10 digits and name must be >= 5 characters"
        );
      }
    } catch (err) {
      alert("Issue arose");
    }
    event.preventDefault();
  };
  componentDidMount() {
    this.updateData();
    getOpenLoans();
  }
  updateData() {

    axios
      .get("https://34.68.75.97:8080/api/users/" + this.state.username)
      .then(res => {
        //In case user leaves any information blank just submit their current info
        this.setState({
          prevName: res.data.name
        });
        this.setState({
          prevNumber: res.data.number
        });
        this.setState({
          prevPassword: res.data.password
        });
        this.setState({
          dob: res.data.dob
        });
        this.setState({
          balance: res.data.balance
        });
        password = res.data.password;
        document.getElementById("basic").innerHTML =
          "Name: " +
          res.data.name + "<br/>" + "<br/>"+
          " Number: " +
          res.data.number + "<br/>" + "<br/>" +
          " Date of Birth: " +
          res.data.dob + "<br/>" + "<br/>" +
          " Username: " +
          res.data._id + "<br/>" + "<br/>" +
          " Balance: €" +
          res.data.balance;
      })
      .catch(error => {
        alert("Can't communicate with server");
      });
  }
  deleteUser() {
    var answer = window.prompt("Enter password to delete account");
    try {
      if (
        sha256(answer) === password &&
        parseInt(sessionStorage.getItem("openLoans")) === 0
      ) {
        axios
          .delete(
            "https://34.68.75.97:8080/api/transactions/" +
              sessionStorage.getItem("email")
          )
          .catch(error => {
            alert("Error connecting to server");
          });
        axios
          .delete(
            "https://34.68.75.97:8080/api/loans/" +
              sessionStorage.getItem("email")
          )
          .catch(error => {
            alert("Error connecting to server");
          });
        axios
          .delete(
            "https://34.68.75.97:8080/api/users/" +
              sessionStorage.getItem("email")
          )
          .catch(error => {
            alert("Error connecting to server");
          });
        alert("User deleted");
        ReactDOM.render(<Login />, document.getElementById("root"));
      } else {
        alert("Action aborted, password was incorrect or you have open loans");
      }
    } catch {
      alert("Internal system error");
    }
  }
  render() {
    return (
      <div className="UserInfo">
        <Helmet>
          <title>User Info</title>
        </Helmet>
        <h1>Welcome to the User Info Page!</h1>
        <Card>
          <Card.Header>Your Basic Information</Card.Header>
          <Card.Body>
            <Card.Text id="basic" />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Change Your Info</Card.Header>
          <Card.Body>
            <Card.Text id="basic" />
            <p>
              Change your information down below, if any field is left blank
              we'll just fill it in with your current information
            </p>
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
                  value={this.state.email}
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
                  <InputGroup.Text id="basic-addon1">
                    Phone Number:
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  type="number"
                  value={this.state.number}
                  onChange={this.handleNumberChange}
                />
              </InputGroup>
              <Button size="sm" id="updateButton" type="submit">
                Update Information
              </Button>
            </form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            Call Kenny Loggins You're in the DANGER ZONE!
          </Card.Header>
          <Card.Body>
            Click here to delete account, please don't leave us >:'(
            <br/>
            <br/>
            <Button onClick={this.deleteUser} variant="danger">
              Delete Account
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserInfo;
