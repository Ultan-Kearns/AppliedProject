import React from "react";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import LoanStyle from "../Styles/LoanStyle.css";

function Loans() {
  return (
    <div className="Loans">
      <Helmet>
        <title>Loans</title>
      </Helmet>
      <h1>Apply & View Loans</h1>
      <h2>Apply for loans here:</h2>
      <div className="loanApply">
        <input type="number" placeholder="Amount" />
        <br />
        <Button size="sm" id="loanButton">
          Apply for Loan
        </Button>
      </div>
      <h2>List of loans</h2>
      <div className="loanList" />
    </div>
  );
}

export default Loans;
