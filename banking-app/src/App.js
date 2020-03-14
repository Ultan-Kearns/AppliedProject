import React from "react";
import { Link } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Loans from "./Components/Loans";
import Headlines from "./Components/Headlines";
import Transactions from "./Components/Transactions";
import Statistics from "./Components/Statistics";
import UserInfo from "./Components/UserInfo";
import Error from "./Components/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "axios";
import "./Styles/App.css";

class App extends React.Component {
  logout() {
    sessionStorage.setItem("username", "");
    window.location.reload();
  }
  componentDidMount() {
    //this stops context menu being used in app
    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });
  }
  render() {
    return (
      <div className="App">

        {/*Show the navigation throughout app*/}
        <Router>
          <nav>
            <div className="nav-links">
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
                <Button
                  variant="warning "
                  size="sm"
                  onClick={this.logout}
                  id="logout"
                >
                  Logout
                </Button>
              </ButtonToolbar>
            </div>
          </nav>
          <Switch>
            {/* Routes are defined here */}
            <Route path="/" exact component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Loans" component={Loans} />
            <Route path="/Transactions" component={Transactions} />
            <Route path="/UserInfo" component={UserInfo} />
            <Route path="/Statistics" component={Statistics} />
            <Route path="/Headlines" component={Headlines} />
            {/*If route undefined redirect to error*/}
            <Route path="/*" component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
