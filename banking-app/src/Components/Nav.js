import React from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Loans from './Loans';
import Statements from './Statements';
import Error from './Error';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './nav.css';
function Nav(){
  return(
    <Router>
    <nav>
    <h1 id = "header">Independent Banking - We work for you</h1>
    <ul  class = "nav-links">
    <Link to="/">
    <Button variant="contained" color="primary">
      Home
    </Button>
    </Link>
    <Link to="/About">
    <Button variant="contained" color="primary">
      About Us
    </Button>
    </Link>
    <Link to="/Loans">
    <Button variant="contained" color="primary">
      Loans
    </Button>
    </Link>
    <Link to="/Statements">
    <Button variant="contained" color="primary">
      Statements
    </Button>
    </Link>
    <Link to="/Statements">
    <Button variant="contained" color="primary">
      Statistics
    </Button>
    </Link>
    <Link to="/Statements">
    <Button variant="contained" color="primary">
      User Info
    </Button>
    </Link>
    </ul>
    </nav>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/About" component={About}/>
    <Route path="/Loans" component={Loans}/>
    <Route path="/Statements" component={Statements}/>
    <Route path="/*" component={Error}/>
    </Switch>
    </Router>
  );
}
export default Nav;
