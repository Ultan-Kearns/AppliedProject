
import React from "react";
import axios from "axios";

class Statements extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      statments: "",
      statementObj:""
    }
  }
  componentDidMount(){
    const axios = require('axios').default;

    axios.get("https://localhost:8080/api/statements").then(res=>{
      console.log(res.data)
      this.setState({
        statements:res.data,
      });
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
