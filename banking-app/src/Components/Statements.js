import React from "react";
import Axios from "axios";

class Statements extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      statments: [{}],
      users:"",
    }
  }
  componentDidMount(){
    const axios = require('axios').default;
    axios.get("https://localhost:8080/api/statements").then(res=>{
      console.log(res.data[0].location)
      this.setState({
        statements:res.data,
      });
      /*
       axios.get("https://localhost:8080/api/users").then(userRes=>{
         this.setState({
          users:userRes.data,
        });
        */
    })
   }
  render() {
    return (
      <div className="statements">
        <title>statements</title>
        <h1>Welcome to the Statements!</h1>
        <p>
          You can view statements here : D- maybe have a dropdown to select year
          or month of statement
          {JSON.stringify(this.state.statements)}
        </p>
      </div>
    );
  }
}

export default Statements;
