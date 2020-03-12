import React from "react";
import { Helmet } from "react-helmet";
import App from "../App";
import ReactDOM from "react-dom";
import "../Styles/HomeStyle.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
          node.id = "headlines";
          var headlineText = document.createTextNode(
            res.data.articles[i].title + "\u000a"
          );
          var descriptionText = document.createTextNode(
            "Description: " + res.data.articles[i].description
          );
          var authorText = document.createTextNode(
            "Author: " + res.data.articles[i].author
          );
          var image = document.createElement("IMG");
          image.src = res.data.articles[i].urlToImage;
          image.alt = "Picture not available";
          var link = document.createElement("A");
          link.href = res.data.articles[i].url;
          link.text = "Link to article";
          var br = document.createElement('BR');
          var br2 = document.createElement("BR");

          node.append(headlineText);
          node.append(br)
          node.appendChild(br.cloneNode())
          node.append(descriptionText);
          node.appendChild(br.cloneNode())
          node.appendChild(br.cloneNode())
          node.append(authorText);
          node.appendChild(br.cloneNode())
          node.appendChild(br.cloneNode())
          node.append(link);
          node.appendChild(br.cloneNode())
          node.append(image);
          document.getElementById("homeFinance").appendChild(node);
        }
        ReactDOM.render(<App />, document.getElementById("root"));
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
        });
      //update bal
      const newBalance = {
        balance:
          parseInt(sessionStorage.getItem("balance")) -
          parseInt(this.state.amount)
      };
      axios
        .post(
          "https://localhost:8080/api/users/" +
            sessionStorage.getItem("email") +
            "/balance",
          newBalance
        )
        .then(res => {
          axios
            .get(
              "https://localhost:8080/api/users/" +
                sessionStorage.getItem("email")
            )
            .then(res => {
              sessionStorage.setItem("balance", res.data.balance);
            })
            .catch(error => {
              alert("Could not send money");
            });
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
        });
      axios
        .get("https://localhost:8080/api/users/" + this.state.accountId)
        .then(res => {
          this.setState({
            payeeBalance:
              parseInt(res.data.balance) + parseInt(this.state.amount)
          });
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
            });
        })
        .catch(error => {});
    } else {
      alert("Transaction failed");
    }
    e.preventDefault();
  };
  render() {
    return (
      <div className="Home">
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
              <Card.Text id="homeFinance" />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default Home;
