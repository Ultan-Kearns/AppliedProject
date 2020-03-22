import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getHeadlines } from "../Services/HeadlineHelpers.js";
 
import ReactDOM from "react-dom";

const axios = require("axios").default;

class Home extends React.Component {

  constructor(props) {

    super();
    this.state = {
      amount: "",
      accountId: "",
      payeeBalance: ""
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

  }

  handleSubmitForm = e => {
    if (this.state.accountId === sessionStorage.getItem("email")) {
      alert("Cannot send money to yourself ( ;-( )");
      e.preventDefault();
      return;
    }
    if (this.state.amount === "" || this.state.accountId === "") {
      alert(
        "The amount / account ID cannot be null, want to donate it to us? >;D"
      );
    }
    if (
      parseInt(this.state.amount) <=
        parseInt(sessionStorage.getItem("balance")) &&
      parseInt(this.state.amount) > 0
    ) {
      var date = new Date();
      //update bal
      const newBalance = {
        balance:
          parseInt(sessionStorage.getItem("balance")) -
          parseInt(this.state.amount)
      };
      sessionStorage.setItem("balance", newBalance.balance);

      axios
        .post(
          "https://localhost:8080/api/users/" +
            sessionStorage.getItem("email") +
            "/balance",
          newBalance
        )
        .catch(error => {
          alert("Could not send money");
        });

      //payer logic
      const newTransaction = {
        email: sessionStorage.getItem("email"),
        cost: this.state.amount * -1,
        location: "Online Banking Transfer to " + this.state.accountId,
        name: sessionStorage.getItem("username"),
        date: date
      };
      //create transaction
      axios
        .post("https://localhost:8080/api/transactions", newTransaction)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          alert("ERROR");
        });
      //payee logic
      const payeeTransaction = {
        email: this.state.accountId,
        cost: this.state.amount,
        location:
          "Online Banking Transfer from " + sessionStorage.getItem("email"),
        name: sessionStorage.getItem("username"),
        date: date
      };
      //create transaction
      axios
        .post("https://localhost:8080/api/transactions", payeeTransaction)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          alert("ERROR");
        });
      axios
        .get("https://localhost:8080/api/users/" + this.state.accountId)
        .then(res => {
          this.setState({
            payeeBalance:
              parseInt(res.data.balance) + parseInt(this.state.amount)
          });
        })
        .catch(error => {
          alert("ERROR");
        })
        .then(res => {
          const newBalance = {
            balance: this.state.payeeBalance
          };
          axios
            .post(
              "https://localhost:8080/api/users/" +
                this.state.accountId +
                "/balance",
              newBalance
            )
            .then(res => {
              //not doing this after 3 attemps
              document.getElementById("balance").innerHTML =
                "Your balance: €" + sessionStorage.getItem("balance");
              alert(
                "Money Sent to: " +
                  this.state.accountId +
                  " Amount sent: " +
                  this.state.amount +
                  " New Balance: " +
                  sessionStorage.getItem("balance")
              );
            })
            .catch(error => {
              alert("ERROR");
            });
        })
        .catch(error => {
          alert("ERROR " + error);
        });
    } else {
      alert("Transaction failed");
    }
    e.preventDefault();
  };
  render() {
    return (
      <div className="Home" id = "home">
        <Helmet>
          <title>Home</title>
        </Helmet>

        <Card>
          <Card.Header>
            Welcome to the Independent Banking,{" "}
            {sessionStorage.getItem("username")}!
          </Card.Header>
          <Card.Body>
            <Card.Text id="balance">Your balance:</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Send money</Card.Header>
          <Card.Body>
            <Card.Text>
              Send money to another account by simply entering the amount to
              send and the account number
            </Card.Text>
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
          </Card.Body>
        </Card>
        <div id="finance">
          <Card>
            <Card.Header>
              Latest Financial News Headlines for you{" "}
              {sessionStorage.getItem("name")}: Thanks to newsapi.org! - For
              more news visit the Headlines Page :)
            </Card.Header>
            <Card.Body>
              {getHeadlines(3)}
              <ul id="financial" />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default Home;
