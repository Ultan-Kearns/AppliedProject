import React from "react";
import { Link } from "react-router-dom";
import Routes from "../Services/Routes.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import App from "../App.js";
import "axios";
import "../Styles/Nav.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
class Nav extends React.Component {
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
          <div className="nav-links">
            <nav>
              {/* Buttons that link to various Components */}
              <ButtonToolbar>
                <Link to="/">
                  <Button variant="primary " size="sm">
                    Home
                  </Button>
                </Link>
                <Link to="/About">
                  <Button variant="primary" size="sm">
                    About Us
                  </Button>
                </Link>
                <Link to="/Headlines">
                  <Button variant="primary " size="sm">
                    Headlines
                  </Button>
                </Link>
                <Link to="/Loans">
                  <Button variant="primary" size="sm">
                    Loans
                  </Button>
                </Link>
                <Link to="/Transactions">
                  <Button variant="primary" size="sm">
                    Transactions
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
                <Link to="/Support">
                  <Button variant="primary" size="sm">
                    Support
                  </Button>
                </Link>
                <Button
                  variant="warning "
                  size="sm"
                  onClick={this.logout}
                  id="logout"
                >
                  Logout
                </Button>
              </ButtonToolbar>
            </nav>
          </div>

          <Routes />
        </Router>
      </div>
    );
  }
}
export default Nav;
