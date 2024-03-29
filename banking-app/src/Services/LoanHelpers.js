export function getOpenLoans() {
  var openLoan = 0;
  sessionStorage.setItem("openLoans", openLoan);
  var today = new Date();
  const axios = require("axios").default;
  //do update loan cost in here
  //helper function to count open loans and to add interest
  axios
    .get("https://34.68.75.97:8080/api/loans/" + sessionStorage.getItem("email"))
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].status === "Open") {
          openLoan++;
        }
        sessionStorage.setItem("openLoans", openLoan);

        var loanUpdate = new Date(res.data[i].lastUpdate);
        //see how many weeks have past
        var weeks = Math.abs(Math.floor((today - loanUpdate) / 604800000));
        const newAmount = {
          amount: parseInt(
            Math.round(
              res.data[i].amount +
                (res.data[i].amount * (0.1 * Math.round(weeks)))
            )
          )
        };
        //checks if more than 1 week has passed since last interest was added
        if (
          weeks >= 1
        ) {


          const lastUpdate = {
            lastUpdate: today
          };
          axios
            .post(
              "https://34.68.75.97:8080/api/loans/" +
                sessionStorage.getItem("email") +
                "/" +
                res.data[i]._id +
                "/amount",
              newAmount
            )
            .then(res => {
            })
            .catch(err => {
              alert("issue adding interest: " + err);
            });
          axios
            .post(
              "https://34.68.75.97:8080/api/loans/" +
                sessionStorage.getItem("email") +
                "/" +
                res.data[i]._id +
                "/date",
              lastUpdate
            )
            .then(res => {

             })
            .catch(err => {
              alert("issue with dates: " + err);
            });
        } else {
          console.log("No interest ;D");
        }
      }
    })
    .catch(error => {
      alert("error getting loans: " + error);
    });
  return openLoan;
}
