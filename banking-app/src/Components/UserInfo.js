import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Login from "./Login"
import ReactDOM from "react-dom";

const axios = require("axios").default;

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
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
            res.data.dob
        );
        document.getElementById("basic").append(text);
      });
  }
  deleteUser(){
    axios.delete("https://localhost:8080/api/users/" + sessionStorage.getItem("email"))
    alert("User deleted")
    ReactDOM.render(<Login />, document.getElementById("root"))
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
        <p>
          Include text boxes to allow user to update their info such as password
          and name
        </p>
        <h2>Delete account: </h2>
        <p>Allow user to delete account</p>
        <Button onClick={this.deleteUser}>Delete Account</Button>
      </div>
    );
  }
}

export default UserInfo;
