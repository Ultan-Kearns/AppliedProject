import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/AboutStyle.css";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
function About() {
  return (
    <div className="About">
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1>About Us</h1>
      <p>We are an independent bank that caters to all of our customers!</p>
      <p>
        Hello {sessionStorage.getItem("username")}, we're so excited here at
        independent banking to have you here with us let us explain how we
        differ from other banks.
      </p>
      <div className="liesWeTellCustomers" id="left">
        <Card style={{ width: '50vw' }}>
        <Card.Header>
          Welcome to the only bank you'll ever need!
        </Card.Header>
        <Image
          src={require("../Assets/happycustomers.jpg")}
          alt="Pictures of happy sheep...... I mean customers!"
        roundedCircle/>
    <Card.Body>
      <Card.Title>We Care About YOU!</Card.Title>
      <Card.Text>
      <p>
        Yes we know you have heard this blaise comment before but we really
        mean it, just because we are a massive corporation whose only
        objective is to make a profit doesn't mean we don't care! I mean look
        at how happy our customers are! You too can be happy if you just give
        us all your business and a tonne of money!
      </p>
      </Card.Text>
    </Card.Body>
  </Card>
      </div>
      <div className="liesWeTellCustomers" id="right">
      <Card style={{ width: '46vw' }}>
      <Card.Header>
        We don't just care about money, we care about OUR money!
      </Card.Header>
      <Image
        src={require("../Assets/money.jpg")}
        alt="Pictures of happy sheep...... I mean customers!"
      roundedCircle/>
  <Card.Body>
    <Card.Title>We Don't Just Care About Money!</Card.Title>
    <Card.Text>
    Yes we know what we said before makes us seem callous! but we care
    about your personal well-being, if something were to happen to you how
    in the world could we make money off you? That's why we care!
    </Card.Text>
  </Card.Body>
</Card>
      </div>
      <div className="liesWeTellCustomers" id="theBigOne">
      <Card>
      <Card.Header>
        A secret just for you, and everyone else who has an account
      </Card.Header>
      <Card.Body>
        <Card.Title>Wanna hear a secret?!</Card.Title>
        <Card.Text>
    Pssssst............. You're getting an amazing deal!
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
      <div className="liesWeTellCustomersBottom" id="left">
      <Card>
      <Card.Header>
        Our evil..... I mean our plans
      </Card.Header>
      <Card.Body>
        <Card.Title>Our Aims</Card.Title>
        <Card.Text>
        <p>
          We aim to provide you, {sessionStorage.getItem("username")}, YES YOU!
          with a site that is:
        </p>
        <ul>
          <li>
            Responsive - A site that is accessible from any device and still
            looks good!
          </li>
          <li>Secure - A site that won't leave your data compromised</li>
          <li>Robust - A site that won't let you down</li>
        </ul>
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
    </div>
  );
}

export default About;
