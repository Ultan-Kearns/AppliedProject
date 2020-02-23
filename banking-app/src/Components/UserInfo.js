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

const axios = require("axios").default;
const sha256 = require("js-sha256");
var password = "";
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
      dob: "",
      balance: ""
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
      alert(this.state.password);
    } else {
      this.setState({
        password: this.state.prevPassword
      });
      alert("PASS WILL = PREV PASS " + this.state.password);
    }
    //strip out
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        this.setState({
          balance: res.data.balance
        });
      })
      .catch(error => {});
    //hash pass using sha256
    const newUser = {
      _id: this.state.newUsername.toLowerCase(),
      password: this.state.password,
      name: this.state.name,
      number: this.state.number,
      dob: this.state.dob,
      balance: parseInt(this.state.balance),
      iban: "",
      bic: ""
    };
    //problem with axios not being asynchronous may find a different way to handle this
    const CancelToken = axios.CancelToken;
    let cancel;
    try {
      if (
        this.state.number.length === 10 &&
        this.state.name.length >= 5 &&
        this.state.password.length >= 5
      ) {
        var isCancelled = false;
        axios
          .get("https://localhost:8080/api/users/" + newUser._id)
          .then(res => {
            alert(res.data);
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
            } else {
              alert("T ");
            }
          })
          .then(res => {
            alert("IS " + isCancelled + this.state.dob);
            if (isCancelled === false) {
              //delete original user
              axios
                .delete(
                  "https://localhost:8080/api/users/" +
                    sessionStorage.getItem("email")
                )
                .then(res => {})
                .catch(error => {
                  console.log("ERR");
                });
              //recreate user for ID - for some reason it clones
              axios
                .post("https://localhost:8080/api/users/", newUser)
                .then(res => {
                  //log res for testing
                  console.log(res.data);
                })
                .catch(error => {
                  console.log("ERR");
                });
              axios
                .post(
                  "https://localhost:8080/api/transactions/" +
                    sessionStorage.getItem("email") +
                    "/" +
                    this.state.newUsername
                )
                .then(res => {
                  console.log("TESTING UPDATE TRANSACTION" + JSON.stringify(res.data));
                })
                .catch(error => {
                  console.log("Error with transactions");
                });

              axios
                .post(
                  "https://localhost:8080/api/loans/" +
                    sessionStorage.getItem("email") +
                    "/" +
                    this.state.newUsername
                )
                .then(res => {

                  sessionStorage.setItem("email", this.state.newUsername);
                  alert("Updated user " + this.state.newUsername + " Bal " + this.state.balance);
                  this.state.username = this.state.newUsername
                }).then(res=>{
                                    this.updateData()
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
      .get(
        "https://localhost:8080/api/users/" + this.state.username
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
            res.data._id +
            " Balance: " +
            res.data.balance,
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
          }),
          this.setState({
            balance: res.data.balance
          })
        );
        password = res.data.password;
        document.getElementById("basic").appendChild(text);
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
            "https://localhost:8080/api/transactions/" +
              sessionStorage.getItem("email")
          )
          .catch(error => {
            alert("Error connecting to server");
          });
        axios
          .delete(
            "https://localhost:8080/api/loans/" +
              sessionStorage.getItem("email")
          )
          .catch(error => {
            alert("Error connecting to server");
          });
        axios
          .delete(
            "https://localhost:8080/api/users/" +
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
        <h1>Welcome to the User Info!</h1>
         <h2>Basic Info: </h2>
        <p id="basic" />
        <h2>Change Info: </h2>
        <p>Change your information down below, if any field is left blank we'll just fill it in with your current information</p>
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
              <InputGroup.Text id="basic-addon1">Phone Number:</InputGroup.Text>
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
