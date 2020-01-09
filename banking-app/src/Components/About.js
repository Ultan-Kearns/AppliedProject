import React from "react";
import { Helmet } from "react-helmet";
import AboutStyle from "../Styles/AboutStyle.css";

function About() {
  return (
    <div className="About">
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1>Welcome to the About!</h1>
      <p>We are an independent bank that caters to all of our customers!</p>
      <p>
        Hello {sessionStorage.getItem("username")}, we're so excited here at
        independent banking to have you here with us let us explain how we
        differ from other banks.
      </p>
      <div className="liesWeTellCustomers" id="left">
        <h2>We Care About You!</h2>
        <p>
          Yes we know you have heard this blaise comment before but we really
          mean it, just because we are a massive corporation whose only
          objective is to make a profit doesn't mean we don't care! I mean look
          at how happy our customers are! You too can be happy if you just give
          us all your business and a tonne of money!
        </p>
        <img
          src={require("../Assets/happycustomers.jpg")}
          alt="Pictures of happy sheep...... I mean customers!"
        />
      </div>
      <div className="liesWeTellCustomers" id="right">
        <h2>We Don't Just Care About Money!</h2>
        <p>
          Yes we know what we said before makes us seem callous! but we care
          about your personal well-being, if something were to happen to you how
          in the world could we make money off you? That's why we care!
        </p>
        <img
          src={require("../Assets/money.jpg")}
          alt="Pictures of happy sheep...... I mean customers!"
        />
      </div>
      <div className="liesWeTellCustomers" id="theBigOne">
        <h2>Wanna hear a secret?!</h2>
        <p>Pssssst............. You're getting an amazing deal!</p>
      </div>
    </div>
  );
}

export default About;
