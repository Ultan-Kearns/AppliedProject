import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import "../Styles/LoanStyle.css";
import { getLoans } from "../Services/LoanHelpers.js";

const axios = require("axios").default;

class Loans extends React.Component {
  componentDidMount() {
    sessionStorage.setItem("openLoans", getLoans());
    this.getLoans();
    //strip out in home
    axios
      .get(
        "https://localhost:8080/api/users/" + sessionStorage.getItem("email")
      )
      .then(res => {
        sessionStorage.setItem("balance", res.data.balance);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      amount: "",
      date: "",
      status: "",
      owedTo: "",
      balance: ""
    };
  }
  getLoans() {
    document.getElementById("loans").innerHTML = "";
    axios
      .get(
        "https://localhost:8080/api/loans/" + sessionStorage.getItem("email")
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.setState({
            _id: res.data[i]._id,
            amount: res.data[i].amount,
            date: res.data[i].date,
            status: res.data[i].status,
            owedTo: res.data[i].owedTo
          });
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI");
          var text = document.createTextNode(
            "Amount: €" +
              this.state.amount +
              ", Date: " +
              this.state.date +
              " ,Status: " +
              this.state.status +
              " ,Owed to: " +
              this.state.owedTo
          );
          var buttonNode = document.createElement("Button");
          buttonNode.textContent = "Pay Back";
          //for repaying loans
          var loanId = this.state._id;
          var loanCost = this.state.amount;
          //create new balance
          const newBalance = {
            balance: parseInt(
              sessionStorage.getItem("balance") - parseInt(this.state.amount)
            )
          };
          buttonNode.addEventListener("click", function() {
            alert(sessionStorage.getItem("balance"));
            //check if balance >= loanpayment
            if (sessionStorage.getItem("balance") >= loanCost) {
              axios
                .post(
                  "https://localhost:8080/api/users/" +
                    sessionStorage.getItem("email") +
                    "/balance",
                  newBalance
                )
                .then(res => {
                  sessionStorage.setItem("balance", newBalance.balance);
                  alert(
                    "Loan repaid new balance is: " +
                      sessionStorage.getItem("balance")
                  );
                });
              axios
                .delete(
                  "https://localhost:8080/api/loans/" +
                    sessionStorage.getItem("email") +
                    "/" +
                    loanId
                )
                .then(res => {
                  alert("Loan paid");
                })
                .catch(error => {
                  alert("error: " + error);
                });
            } else {
              alert("Not enough money in account to repay loan");
            }
          });
          node.append(text);
          node.append(buttonNode);
          document.getElementById("loans").appendChild(node);
          sessionStorage.setItem("openLoans", getLoans());
        }
      })
      .catch(error => {
        alert("Could not get loans");
      });
  }
  handleAmountChange = event => {
    this.setState({
      amount: event.target.value
    });
  };
  handleSubmitForm = event => {
    const axios = require("axios").default;
    var date = new Date();
    var answer = window.confirm(
      "Are you sure you want to take out a loan for: " +
        this.state.amount +
        " ?"
    );
    if (
      this.state.amount !== "" &&
      answer === true &&
      parseInt(this.state.amount) <=
        parseInt(sessionStorage.getItem("balance")) * 0.25 &&
      sessionStorage.getItem("openLoans") < 5 &&
      this.state.amount <= 500
    ) {
      const newLoan = {
        email: sessionStorage.getItem("email"),
        amount: this.state.amount,
        date: date,
        owedTo: "Independent Banking",
        status: "Open"
      };
      const newTransaction = {
        email: sessionStorage.getItem("email"),
        cost: this.state.amount,
        location: "IndependentBanking.com",
        name: sessionStorage.getItem("username"),
        date: date
      };
      axios
        .post("https://localhost:8080/api/transactions", newTransaction)
        .then(res => {
          console.log(res);
        });
      const newBalance = {
        balance:
          parseInt(this.state.amount) +
          parseInt(sessionStorage.getItem("balance"))
      };
      axios.post("https://localhost:8080/api/loans", newLoan).then(res => {
        console.log(res);
      });
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
              alert(
                "loan approved\n New balance is: " +
                  sessionStorage.getItem("balance")
              );
            });
          sessionStorage.setItem("openLoans", getLoans());
          this.getLoans();
        });
    } else {
      alert(
        "Loan aborted\n Reasons why this may happen:\nLoan cannot be null and user must have at least 25% of loan amount in balance\nUsers can only have 5 open loans at a time\n Loans must also be less than or equal to €500"
      );
    }

    event.preventDefault();
  };
  render() {
    return (
      <div className="Loans">
        <Helmet>
          <title>Loans</title>
        </Helmet>
        <h1>Apply & View Loans</h1>
        <h2>Apply for loans here:</h2>
        <form className="loanApply" onSubmit={this.handleSubmitForm}>
          <input
            type="number"
            placeholder="Amount"
            onChange={this.handleAmountChange}
            value={this.state.amount}
          />
          <br />
          <Button size="sm" id="loanButton" type="submit">
            Apply for Loan
          </Button>
        </form>
        <h2>List of loans</h2>
        <div className="loanList" id="loans" />
      </div>
    );
  }
}

export default Loans;
