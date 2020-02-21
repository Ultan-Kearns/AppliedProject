import React, { useState } from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";
const axios = require("axios").default;

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      amount: "",
      accountId: "",
      payeeBalance: "",
    };
  }
  handleAmountChange = event => {
    this.setState({
      amount: event.target.value
    });
  };
  handleIdChange = event => {
    this.setState({
      accountId: event.target.value
    });
  };
  componentDidMount() {
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        var text = document.createTextNode(
          "€" + res.data.balance,
          sessionStorage.setItem("balance", res.data.balance)
        );
        document.getElementById("balance").append(text);
      })
      .catch(error => {});
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
              res.data.articles[i].description +
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
      })
      .catch(error => {});
  }

  handleSubmitForm = e => {
    if (this.state.amount === "" || this.state.accountId === "") {
      alert("The amount / account ID cannot be null, want to donate it to us?");
    } else {
      var date = new Date();
      //payer logic
      const newTransaction = {
        email: sessionStorage.getItem("email"),
        cost: -this.state.amount,
        location: "Online Banking Transfer",
        name: sessionStorage.getItem("username"),
        date: date
      };
      //create transaction
      axios
        .post("https://localhost:8080/api/transactions", newTransaction)
        .then(res => {
          console.log(res);
        });
        //update bal
        const newBalance = {
          balance:
          parseInt(sessionStorage.getItem("balance")) - parseInt(this.state.amount)
        };
        axios
          .post(
            "https://localhost:8080/api/users/" +
              sessionStorage.getItem("email") +
              "/balance",
            newBalance
          )
          .then(res => {
            console.log("TEST " + res);
            axios
              .get(
                "https://localhost:8080/api/users/" +
                  sessionStorage.getItem("email")
              )
              .then(res => {
                sessionStorage.setItem("balance", res.data.balance);

              }).catch(error =>{
                alert("Could not approve loan")
              });
            })



        //payee logic
        const payeeTransaction = {
          email: sessionStorage.getItem("email"),
          cost: this.state.amount,
          location: "Online Banking Transfer",
          name: sessionStorage.getItem("username"),
          date: date
        };
        //create transaction
        axios
          .post("https://localhost:8080/api/transactions", payeeTransaction)
          .then(res => {
            console.log(res);
          });
          //get payee balances
          axios
            .get(
              "https://localhost:8080/api/users/" + this.state.accountId
            )
            .then(res => {
              this.setState({
              payeeBalance: res.data.balance
              })
             })
            .catch(error => {});
          //update bal
          const newPayeeBalance = {
            balance:
            parseInt(this.state.payeeBalance + this.state.amount)
          };
          axios
            .post(
              "https://localhost:8080/api/users/" +
                this.state.accountId +
                "/balance",
              newPayeeBalance
            )
            .then(res => {
              console.log("TEST " + res);
              axios
                .get(
                  "https://localhost:8080/api/users/" +
                    this.state.accountId
                )
                .then(res => {
                  sessionStorage.setItem("balance", res.data.balance);
                  alert("Money sent")
                }).catch(error =>{
                  alert("Could not send money")
                });
    })
  }
    e.preventDefault();
  };

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
          <form className="send" onSubmit={this.handleSubmitForm}>
            Amount to send:
            <input
              type="number"
              id="sendAmount"
              placeholder="Enter amount to send"
              onChange={this.handleAmountChange}
            />
            Account number:
            <input
              type="text"
              id="sendAccount"
              placeholder="Enter account number"
              onChange={this.handleIdChange}
            />
            <br />
            <Button id="sendButton" type="submit">
              Send Money
            </Button>
          </form>
        </div>
        <div id="finance">
          <h2>
            Latest Financial News Headlines for you{" "}
            {sessionStorage.getItem("name")}: Thanks to newsapi.org! - For more
            news visit the Headlines Page :)
          </h2>
          <ul id="homeFinance" />
        </div>
      </div>
    );
  }
}
export default Home;
