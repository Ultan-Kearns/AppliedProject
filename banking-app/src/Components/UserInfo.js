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
    </div>
  );
}

export default UserInfo;
