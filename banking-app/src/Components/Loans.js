import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import LoanStyle from "../Styles/LoanStyle.css";

class Loans extends React.Component {
  componentDidMount() {
    const axios = require("axios").default;

    axios
      .get(
        "https://localhost:8080/api/loans/" + sessionStorage.getItem("email")
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.setState({
            amount: res.data[i].amount,
            date: res.data[i].date
          });
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI");
          var text = document.createTextNode(
            "amount: " + this.state.amount + ", Date: " + this.state.date
          );
          node.append(text);
          document.getElementById("loans").appendChild(node);
        }
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      amount: "",
      date: ""
    };
  }
  handleAmountChange = event => {
    this.setState({
      amount: event.target.value
    });
  };
  handleSubmitForm = event => {
    const axios = require("axios").default;
    var date = new Date();
    const newLoan = {
      email: sessionStorage.getItem("email"),
      amount: this.state.amount,
      date: date.getDate()
    };
    alert(newLoan.amount);
    axios.post("https://localhost:8080/api/loans", newLoan).then(res => {
      console.log(res);
    });
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
        <div className="loanList" id="loans"/>
      </div>
    );
  }
}

export default Loans;
