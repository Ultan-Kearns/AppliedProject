import React from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import HomeStyle from "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;
    axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=e9cdf3a801374e4eba79b8ea0552a4bd").then(res =>{
       console.log("RES" + JSON.stringify(res))
         for (var i = 0; i < res.data.articles.length; i++) {

        //create LI element then form statment then append to LI then add to list
        var node = document.createElement("LI");
        var text = document.createTextNode(
          "\nHeadline: " +res.data.articles[i].title +
          "\nDescription: " + res.data.articles[i].description +
          "\nAuthor: " + res.data.articles[i].author +
          "\n\nUrl\n" + res.data.articles[i].url
        );
        node.append(text);
        document.getElementById("finance").appendChild(node);
      }

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
