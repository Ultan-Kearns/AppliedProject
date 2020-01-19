import React from "react";
import { Helmet } from "react-helmet";

function Statistics() {
  return (
    <div className="Statistics">
      <Helmet>
        <title>Statistics</title>
      </Helmet>
      //create different components to analyze statements
      <h1>Welcome to the Statistics!</h1>
      <p>This page will provide Statistics for users</p>
    </div>
  );
}

export default Statistics;
