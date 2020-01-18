import React from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import HomeStyle from "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;

    axios.get("https://www.reddit.com/r/finance.json").then(res =>{
       console.log("RES" + res)
      /*
      for (var i = 0; i < test.length; i++) {
        this.setState({
          title: test[i].title,
        });
        //create LI element then form statment then append to LI then add to list
        var node = document.createElement("LI");
        var text = document.createTextNode(
          "Location: " +
            this.state.title
        );
        node.append(text);
        document.getElementById("statements").appendChild(node);
      }
      */
    });
    //if(sessionStorage.getItem("username") !="null" && sessionStorage.getItem("username") != null){
    //ReactDOM.render(<App />, document.getElementById("root"));
    ReactDOM.render(<App />, document.getElementById("root"));
  }
  render() {
    return (
      <div className="Home">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h1>
          Welcome to the Independent Banking,{" "}
          {sessionStorage.getItem("username")}!
        </h1>
        <p>
          Here the user can view graphs of monthly expenditure, view how much
          over your current budget you are, view this months transfers
        </p>
        <div id = "finance">
        <h2>Latest financial news</h2>
        <ul id = "financial">
        </ul>
        </div>
        <h2>Latest information for your account</h2>
        <p>Show latest statements, open loans</p>
        <div id="send">
          <h2>Send money </h2>
          <p>
            Send money to another account by simply entering the amount to send
            and the account number
          </p>
          Amount to send:
          <input
            type="number"
            id="sendAmount"
            placeholder="Enter amount to send"
          />
          Account number:
          <input
            type="text"
            id="sendAccount"
            placeholder="Enter account number"
          />
          <br />
          <Button>Send Money</Button>
        </div>
      </div>
    );
  }
}
export default Home;
