import React from "react";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div className="Home">
    <Helmet>
      <title>Home</title>
    </Helmet>
      <h1>Welcome to the Independent Banking!</h1>
      <p>
      Here the user can view graphs of monthly expenditure, view how much over your current budget you are,
      view this months transfers
      </p>
    </div>
  );
}

export default Home;
