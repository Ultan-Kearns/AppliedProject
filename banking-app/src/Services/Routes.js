
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import About from "../Components/About";
import Loans from "../Components/Loans";
import Headlines from "../Components/Headlines";
import Transactions from "../Components/Transactions";
import Statistics from "../Components/Statistics";
import Support from "../Components/Support";
import UserInfo from "../Components/UserInfo";
import Error from "../Components/Error";

export default class routes extends React.Component{
  render(){
    return(
      <Switch>
        {/* Routes are defined here */}
        <Route path="/" exact component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Loans" component={Loans} />
        <Route path="/Transactions" component={Transactions} />
        <Route path="/UserInfo" component={UserInfo} />
        <Route path="/Statistics" component={Statistics} />
        <Route path="/Headlines" component={Headlines} />
        <Route path="/Support" component={Support} />
        {/*If route undefined redirect to error*/}
        <Route path="/*" component={Error} />
      </Switch>
    )
  }
}
