import React from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        var text = document.createTextNode( "€" +
          res.data.balance,
          sessionStorage.setItem("balance",res.data.balance)

        );
        document.getElementById("balance").append(text);
      }).catch(error=>{

      });
    /*
    Pulling data from newsapi.org
    then render App page
    use function helper same in headlines
    */
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e9cdf3a801374e4eba79b8ea0552a4bd"
      )
      .then(res => {
        for (var i = 0; i < 3; i++) {
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI");
          node.id = "headline";
          var text = document.createTextNode(
            "Headline: " +
              res.data.articles[i].title +
              "Description: " +
              res.data.articles[i].description  +
              "Author: " +
              res.data.articles[i].author
          );
          var image = document.createElement("IMG");
          image.src = res.data.articles[i].urlToImage;
          image.alt = "Picture not available";
          var link = document.createElement("A");
          link.href = res.data.articles[i].url;
          link.text = "Link to article";
          node.append(text);
          node.append(link);
          node.append(image);
          document.getElementById("homeFinance").appendChild(node);
        }
        ReactDOM.render(<App />, document.getElementById("root"));
      }).catch(error => {});
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
        <h2 id="balance">Current User Balance: </h2>
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
          <Button id="sendButton">Send Money</Button>
        </div>
        <div id="finance">
          <h2>Latest Financial News Headlines for you {sessionStorage.getItem("name")}: Thanks to newsapi.org! - For more news visit the Headlines Page :)</h2>
          <ul id="homeFinance" />
        </div>
      </div>
    );
  }
}
export default Home;
