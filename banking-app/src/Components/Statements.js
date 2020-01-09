import React from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";

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
      console.log(res.data[0].location)
         this.setState({
          location:res.data[0].location,
          cost: res.data[0].cost,
        });
      }
    )
   }
  render() {
    return (
      <div className="statements">
      <Helmet>
        <title>Statements</title>
      </Helmet>
        <h1>Welcome to the Statements!</h1>
        <p>
          You can view statements here : D- maybe have a dropdown to select year
          or month of statement
          { " Payment Amount: " + this.state.cost + " Location where spent: " + this.state.location}
        </p>
      </div>
    );
  }
}

export default Statements;
