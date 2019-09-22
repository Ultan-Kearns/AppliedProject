import React from "react";
import { Link } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Loans from "./Components/Loans";
import Statements from "./Components/Statements";
import Statistics from "./Components/Statistics";
import UserInfo from "./Components/UserInfo";
import Error from "./Components/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css"
function App() {
  return (
    <div className="App">
      {/*Show the navigation throughout app*/}
        <Router>
          <nav>
            <ul className="nav-links">
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

export default App;
