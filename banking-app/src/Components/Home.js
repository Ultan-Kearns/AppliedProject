import React from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import HomeStyle from "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";

class Home extends React.Component {

  componentDidMount(){
    const axios = require("axios").default;
    /*
    Pulling data from newsapi.org
    */
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e9cdf3a801374e4eba79b8ea0552a4bd"
      )
      .then(res => {
        //some of these are reoccuring
        console.log("RES" + JSON.stringify(res));
        for (var i = 0; i < 4; i++) {
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI");
          node.id = "headline";
                  console.log(res.data.length + " " + i)
          var text = document.createTextNode(

            "\nHeadline: " +
              res.data.articles[i].title +
              "\nDescription: " +
              res.data.articles[i].description +
              "\nAuthor: " +
              res.data.articles[i].author
          );
          var image = document.createElement("IMG");
          image.src = res.data.articles[i].urlToImage;
          image.alt = "Picture not available";
          var link = document.createElement("A");
          link.href = res.data.articles[i].url;
          link.text= "Link to article";
          node.append(text);
          node.append(link);
          node.append(image);
          document.getElementById("financial").appendChild(node);
        }
      });
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
        <div id="finance">
          <h2>Latest Financial News Headlines: Thanks to newsapi.org!</h2>
          <ul id="financial">

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
