import React from "react"
import { Helmet } from "react-helmet"
import Button from "react-bootstrap/Button"
import  "../Styles/LoanStyle.css"

class Loans extends React.Component {
  componentDidMount() {
      this.getLoans()
  }

  constructor(props) {
    super(props)
    this.state = {
      _id: "",
      amount: "",
      date: "",
      status: "",
      owedTo: ""
    }
  }
  getLoans() {
    const axios = require("axios").default
    document.getElementById("loans").innerHTML = ""
    axios
      .get(
        "https://localhost:8080/api/loans/" + sessionStorage.getItem("email")
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.setState({
            amount: res.data[i].amount,
            date: res.data[i].date,
            status: res.data[i].status,
            owedTo: res.data[i].owedTo
          })
          //create LI element then form statment then append to LI then add to list
          var node = document.createElement("LI")
          var text = document.createTextNode(
            "Amount: " +
              this.state.amount +
              ", Date: " +
              this.state.date +
              " ,Status: " +
              this.state.status +
              " ,Owed to: " +
              this.state.owedTo
          )
          node.append(text)
          document.getElementById("loans").appendChild(node)
        }
      })
  }
  handleAmountChange = event => {
    this.setState({
      amount: event.target.value
    })
  }
  handleSubmitForm = event => {
    const axios = require("axios").default
    var date = new Date();
    var fullDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    var cost = this.state.amount
    if (this.state.amount !== "") {
      const newLoan = {
        email: sessionStorage.getItem("email"),
        amount: this.state.amount,
        date: fullDate,
        owedTo: "Independent Banking",
        status: "Open"
      }
      const newTransaction ={
        email: sessionStorage.getItem("email"),
        cost: this.state.amount,
        location: "IndependentBanking.com",
        name: sessionStorage.getItem("username"),
        date: fullDate
      }
      axios.post("https://localhost:8080/api/transactions",newTransaction).then(res =>{
        console.log(res)
      })
      const newBalance = {
        balance: parseInt(this.state.amount) + parseInt(sessionStorage.getItem("balance"))
      }
      axios.post("https://localhost:8080/api/loans", newLoan).then(res => {
        console.log(res)
      })
      axios.post("https://localhost:8080/api/users/" + sessionStorage.getItem("email") + "/balance", newBalance).then(res => {
        console.log("TEST " + res)
      })
      alert("loan approved ;D")
      this.getLoans()
    } else {
      alert("Loan amount cannot be null")
    }
    event.preventDefault()
  }
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
    )
  }
}

export default Loans
