import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
const axios = require("axios").default;

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  deleteAccount(){
    axios.get("https://localhost:8080/api/deleteusers/" + sessionStorage.getItem("email")).then(res=>{
      console.log(res)
    })
    alert("Deleted account")
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
        <Button  onClick={this.deleteAccount()}>Delete Account</Button>
        <p>Allow user to delete account</p>
      </div>
    );
  }
}

export default UserInfo;
