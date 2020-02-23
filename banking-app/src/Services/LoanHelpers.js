export function getOpenLoans() {
  var openLoan = 0
  sessionStorage.setItem("openLoans",openLoan)
  const axios = require("axios").default;
  //helper function to count open loans
  axios
    .get(
      "https://localhost:8080/api/loans/" + sessionStorage.getItem("email")
    )
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if(res.data[i].status === "Open"){
          openLoan++;
        }
        sessionStorage.setItem("openLoans",openLoan)
       }
    }).catch(error => {
      alert("error getting loans")
    })
    return openLoan
}
