import React from "react";
import { Helmet } from "react-helmet";

function About() {
  return (
    <div className="About">
    <Helmet>
      <title>About</title>
    </Helmet>
      <h1>Welcome to the About!</h1>
      <p>We are an independent bank that caters to all of our customers!</p>
    </div>
  );
}

export default About;
