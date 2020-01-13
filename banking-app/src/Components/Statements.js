import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

var statements = []
var test = [{location:"AAA"}]
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
    this.getStatements()

   }
   getStatements(){
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
          console.log("TEST STATEMENTS " + statements.length + " "+  statements[i].location)
          console.log("I " + i + " RES " + res.data[i].cost)
         }
       }
     )
   }
  render() {
    return (
      //statements populating but can't access field
      <div className="statements">
      <Helmet>
        <title>Statements</title>
      </Helmet>
        <h1>Your Statements</h1>
        <p>
          You can view statements here : D- maybe have a dropdown to select year
          or month of statement
          { " Payment Amount: "  + JSON.stringify(statements[0]) +" Location where spent: " + this.state.location}
          </p>
      </div>
    );
  }
}

export default Statements;
