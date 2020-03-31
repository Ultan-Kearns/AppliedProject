export function getOpenLoans() {
  var openLoan = 0;
  sessionStorage.setItem("openLoans", openLoan);
  var today = new Date();
  const axios = require("axios").default;
  //do update loan cost in here
  //helper function to count open loans
  axios
    .get("https://localhost:8080/api/loans/" + sessionStorage.getItem("email"))
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].status === "Open") {
          openLoan++;
        }
        sessionStorage.setItem("openLoans", openLoan);
        //under development

        var loanDate = new Date(res.data[i].date);
                alert("DATE: " + (today - loanDate) + " TEST " + res.data[i].date);
        var weeks = Math.abs((today - loanDate) / 604800000);

        //this tests if one week has passed, this is causing issues

        if (weeks >= 1) {

          const newLoanCost =
            res.data[i].amount + (res.data[i].amount * (0.1 * weeks));
            //404 issue
          axios
            .post(
              "https://localhost:8080/api/loans/" + res.data[i]._id + "/",
              newLoanCost
            )
            .then(res => {
              res.status(200,"got interest updated")
              alert("NEW LOAN COST = " + newLoanCost)
            })
            .catch(err => {
              alert("issue adding interest: " + err);
            });
        }
        else{
          console.log("No interest ;D")
        }
      }
    })
    .catch(error => {
      alert("error getting loans: " + error);
    });
  return openLoan;
}
