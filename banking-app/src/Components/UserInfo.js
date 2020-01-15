import React from "react";
import { Helmet } from "react-helmet";

function UserInfo() {
  return (
    <div className="UserInfo">
      <Helmet>
        <title>User Info</title>
      </Helmet>
      <h1>Welcome to the User Info!</h1>
      <p>This page will show user information</p>
      <h2>Basic Info: </h2>
      <p>Include name, DOB and other user info</p>
      <h2>Change Info: </h2>
      <p>Include text boxes to allow user to update their info such as password and name</p>
      <h2>Delete account: </h2>
      <p>Allow user to delete account</p>
    </div>
  );
}

export default UserInfo;
