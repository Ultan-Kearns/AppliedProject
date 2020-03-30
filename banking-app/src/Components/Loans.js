import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import "../Styles/LoanStyle.css";
import { getOpenLoans } from "../Services/LoanHelpers.js";
import Card from "react-bootstrap/Card";

const axios = require("axios").default;
var date = new Date();
class Loans extends React.Component {
  componentDidMount() {
    sessionStorage.setItem("openLoans", getOpenLoans());
    getOpenLoans();
    this.getUserLoans();
    //strip out in home
    axios
      .get(
        "https://34.68.75.97:8080//api/users/" + sessionStorage.getItem("email")
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
  getUserLoans() {
    document.getElementById("loans").innerHTML = "";
    axios
      .get(
        "https://34.68.75.97:8080//api/loans/" + sessionStorage.getItem("email")
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
              ", \tDate: " +
              this.state.date +
              " ,\tStatus: " +
              this.state.status +
              " ,\tOwed to: " +
              this.state.owedTo
          );
          //ensure that the user pays back earliest loan first
          if (i === 0) {
            //for repaying loans
            var loanId = this.state._id;
            var loanCost = this.state.amount;
            var buttonNode = document.createElement("Button");
            buttonNode.textContent = "Pay Back";
            buttonNode.id = "payButton";
            node.id = "loanEven";
            node.append(text);
            node.append(buttonNode);
            document.getElementById("loans").appendChild(node);
            sessionStorage.setItem("openLoans", getOpenLoans());
            buttonNode.addEventListener("click", function() {
              //check if balance >= loanpayment
              if (sessionStorage.getItem("balance") >= loanCost) {
                buttonNode.disabled = true;
                buttonNode.textContent = "Paid";
                alert("LOAN COST : " + loanCost);
                axios
                  .post(
                    "https://34.68.75.97:8080//api/users/" +
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
                    const newTransaction = {
                      email: sessionStorage.getItem("email"),
                      cost: -loanCost,
                      location: "IndependentBanking.com",
                      name: sessionStorage.getItem("username"),
                      date: date
                    };
                    axios
                      .post(
                        "https://34.68.75.97:8080//api/transactions",
                        newTransaction
                      )
                      .then(res => {
                        console.log(res);
                      });
                  })
                  .then(res => {
                    axios
                      .delete(
                        "https://34.68.75.97:8080//api/loans/" +
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
                  });
                sessionStorage.setItem("openLoans", getOpenLoans());
              } else {
                alert("Not enough money in account to repay loan");
              }
            });
          }
          //create new balance
          const newBalance = {
            balance: parseInt(
              sessionStorage.getItem("balance") - parseInt(this.state.amount)
            )
          };
          if(i % 2 === 0){
            node.id = "loanEven";
          }
          else{
            node.id = "loanOdd";
          }
          node.className = "loan"
          if (i > 0) {

            node.append(text);
            document.getElementById("loans").appendChild(node);
          }
          sessionStorage.setItem("openLoans", getOpenLoans());
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
    var answer = window.confirm(
      "Are you sure you want to take out a loan for: " +
        this.state.amount +
        " ?"
    );
    //validation if statemnt
    if (
      this.state.amount !== "" &&
      answer === true &&
      Math.round(parseFloat(this.state.amount * 0.25)) <=
        Math.floor(parseInt(sessionStorage.getItem("balance"))) &&
      sessionStorage.getItem("openLoans") < 5 &&
      this.state.amount <= 500 &&
      this.state.amount > 0
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
        .post("https://34.68.75.97:8080//api/transactions", newTransaction)
        .then(res => {
          console.log(res);
        });
      const newBalance = {
        balance:
          parseInt(this.state.amount) +
          parseInt(sessionStorage.getItem("balance"))
      };
      axios.post("https://34.68.75.97:8080//api/loans", newLoan).then(res => {
        console.log(res);
      });
      axios
        .post(
          "https://34.68.75.97:8080//api/users/" +
            sessionStorage.getItem("email") +
            "/balance",
          newBalance
        )
        .then(res => {
          console.log("TEST " + res);
          axios
            .get(
              "https://34.68.75.97:8080//api/users/" +
                sessionStorage.getItem("email")
            )
            .then(res => {
              sessionStorage.setItem("balance", res.data.balance);
              alert(
                "loan approved\n New balance is: " +
                  sessionStorage.getItem("balance")
              );
            })
            .catch(error => {
              alert("Could not approve loan");
            });
          sessionStorage.setItem("openLoans", getOpenLoans());
          this.getUserLoans();
        });
    } else {
      alert(
        "Loan aborted\n Reasons why this may happen:\nLoan cannot be null and user must have at least 25% of loan amount in balance\nUsers can only have 5 open loans at a time\n Loans must also be less than or equal to €500\nLoan must be greater than 0"
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
        <Card>
          <Card.Header>Apply For Loans Here</Card.Header>
          <Card.Body>
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
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>List of Loans</Card.Header>
          <Card.Body>
            <Card.Text id="loans" />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Loans;
