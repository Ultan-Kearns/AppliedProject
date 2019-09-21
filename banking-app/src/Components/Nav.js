import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Loans from "./Loans";
import Statements from "./Statements";
import Statistics from "./Statistics";
import UserInfo from "./UserInfo";
import Error from "./Error";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Nav() {
  return (
    <div className="navigation">
      <Router>
        <nav>
        <h1 className="header">independent Banking:<i> We Work For You!</i></h1>
          <ul className="nav-links">
            {/* Buttons that link to various Components */}
            <ButtonToolbar>
              <Link to="/">
                <Button variant="primary" size="sm">
                  Home
                </Button>
              </Link>
              <Link to="/About">
                <Button variant="primary" size="sm">
                  About Us
                </Button>
              </Link>
              <Link to="/Loans">
                <Button variant="primary" size="sm">
                  Loans
                </Button>
              </Link>
              <Link to="/Statements">
                <Button variant="primary" size="sm">
                  Statements
                </Button>
              </Link>
              <Link to="/Statistics">
                <Button variant="primary" size="sm">
                  Statistics
                </Button>
              </Link>
              <Link to="/UserInfo">
                <Button variant="primary" size="sm">
                  User Info
                </Button>
              </Link>
            </ButtonToolbar>
          </ul>
        </nav>
        <Switch>
          {/* Routes are defined here */}
          <Route path="/" exact component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Loans" component={Loans} />
          <Route path="/Statements" component={Statements} />
          <Route path="/UserInfo" component={UserInfo} />
          <Route path="/Statistics" component={Statistics} />
          {/*If route undefined redirect to error*/}
          <Route path="/*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}
export default Nav;
