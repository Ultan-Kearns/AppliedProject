import React from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';
import About from './About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function Nav(){
  return(
    <Router>
    <nav>
    <h3>Navigation</h3>
    <ul>
    <Link to="/About">
    <li>About</li>
    </Link>
    <Link to="/">
    <li>Home</li>
    </Link>
    </ul>
    </nav>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/About" component={About}/>
    </Switch>
    </Router>
  );
}
export default Nav;
