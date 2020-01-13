import React from "react";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div className="Home">
    <Helmet>
      <title>Home</title>
    </Helmet>
      <h1>Welcome to the Independent Banking, {sessionStorage.getItem("username")}!</h1>
      <p>
      Here the user can view graphs of monthly expenditure, view how much over your current budget you are,
      view this months transfers
      </p>
      <h2>Latest financial news</h2>
      <p>
      Fill in random stuff here or put it on server then pull, or you can use Reddit! (might be less secure)
      </p>
      <h2>Latest information for your account</h2>
      <p>
        Show latest statements, open loans
      </p>
    </div>
  );
}

export default Home;
