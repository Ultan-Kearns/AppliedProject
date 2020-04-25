import React from "react";
import Routes from "../Services/Routes.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import App from "../App.js";
import "axios";
import "../Styles/Nav.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
class NavigationBar extends React.Component {
  logout() {
    sessionStorage.setItem("username", "");
    window.location.reload();
  }
  componentDidMount() {}

  render() {
    return (
      <div className="Nav">
        <App />
        {/*Show the navigation throughout app*/}

        <Router>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav id="navigation" className="mr-auto">
                  {/* Buttons that Link to various Components */}

                  <Link to="/">Home</Link>
                  <Link to="/About">About Us</Link>
                  <Link to="/Headlines">Headlines</Link>
                  <Link to="/Loans">Loans</Link>
                  <Link to="/Transactions">Transactions</Link>
                  <Link to="/Statistics">Statistics</Link>
                  <Link to="/UserInfo">User Info</Link>
                  <Link to="/Support">Support</Link>
                  <Button
                    variant="warning "
                    size="sm"
                    onClick={this.logout}
                    id="logout"
                  >
                    Logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <Routes />
        </Router>
      </div>
    );
  }
}
export default NavigationBar;
