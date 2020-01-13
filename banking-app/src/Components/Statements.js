import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

var statements = []

class Statements extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      cost:"",
      location:"",
      users:"",
    }
  }
  componentWillMount(){
    //connect to server and get statements upon component load
    //use loop and check user ID to print out right statements for user
    const axios = require('axios').default;
    axios.get("https://localhost:8080/api/statements").then(res=>{
      //log res for testing
      console.log("LOCATION " + res.data[1].location)
      console.log(res)
        for(var i = 0; i < res.data.length; i++){
          this.setState({
           location:res.data[i].location,
           cost: res.data[i].cost,
         });
         statements[i] =  {location:res.data[i].location,cost:res.data[i].cost}
         console.log("I " + i + " RES " + res.data[i].cost)
        }
      }
    )
   }
  render() {
    return (
      <div className="statements">
      <Helmet>
        <title>Statements</title>
      </Helmet>
        <h1>Your Statements</h1>
        <p>
          You can view statements here : D- maybe have a dropdown to select year
          or month of statement
          {console.log("TEST " + statements.length + " st " + statements.cost)}
          { " Payment Amount: " + statements.cost + " Location where spent: " + this.state.location}
        </p>
      </div>
    );
  }
}

export default Statements;
