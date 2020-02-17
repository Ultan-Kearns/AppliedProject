import React from "react";
import { Helmet } from "react-helmet";

import { Bar } from "react-chartjs-2";
//Alpha Vantage API key - G38RVCM1OWLSKALP
const axios = require("axios").default;

//change this to get labels of dates from loans /transactions
var loanState = {
  type:'bar',
  labels: [],
  datasets: [
    {
      label: "Loan Amount",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: []
    },
  ],
  scales: {
        xAxes: [{
          display: false,
          ticks: {
            min: 0
          }
        }],
        yAxes: [{
          display: false
        }],
      }
};
var transactionState = {
    type:'bar',
  labels: [],
  datasets: [
    {
      label: "Transaction Amount",
      backgroundColor: "rgba(255,0,0,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [0.0002]
    }
  ],
  scales: {
        xAxes: [{
          display: false,
          ticks: {
            min: 0
          }
        }],
        yAxes: [{
          display: false
        }],
      }
};
 axios
  .get("https://localhost:8080/api/loans/" + sessionStorage.getItem("email"))
  .then(res => {
    console.log(res.data)
    for(var i = 0; i < res.data.length; i++)
    {
      loanState.datasets[0].data[i] = res.data[i].amount
      loanState.labels[i] = res.data[i].amount
      console.log("DATA LOANS " +   loanState.datasets[0].data[i])

    }
    return loanState
  })
  .catch(function(error) {
    alert("Error: " + error)  });
  axios
   .get("https://localhost:8080/api/transactions/" + sessionStorage.getItem("email"))
   .then(res => {
     for(var i = 0; i < res.data.length; i++)
     {
       transactionState.datasets[0].data[i] = res.data[i].cost
       transactionState.labels[i] = res.data[i].location
       console.log("DATA " +   loanState.datasets[0].data[i])

     }
     return transactionState
   })
   .catch(function(error) {
     console.log("tRANS " + transactionState.datasets[0])
         alert("Error: " + error)
   });
class Statistics extends React.Component {

  componentDidMount() {

    //this is for getting daily conversion rates and stock info
    try {
      axios
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var d = res.data["Meta Data"]["3. Last Refreshed"];
          d = d.split(" ")[0];
          var node = document.createElement("LI");
          node.id = "stockresults";

          var text = document.createTextNode(
            "Stats for today: Open: " +
              res.data["Time Series (Daily)"][d]["1. open"] +
              " High: " +
              res.data["Time Series (Daily)"][d]["2. high"] +
              " Low: " +
              res.data["Time Series (Daily)"][d]["3. low"] +
              " Close: " +
              res.data["Time Series (Daily)"][d]["4. close"] +
              " Volume: " +
              res.data["Time Series (Daily)"][d]["5. volume"]
          );
          node.append(text);
          document.getElementById("stock").appendChild(node);
        })
        .catch(function(error) {
          var node = document.createElement("LI");
          node.id = "stockresults";
          var text = document.createTextNode(
            "Sorry something went wrong while getting the stock results data :*("
          );
          node.append(text);
          document.getElementById("stock").appendChild(node);

          console.log("error");
        });
      axios
        .get(
          "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=BTC&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var eur_to_btc =
            "1 Euro = " +
            res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] +
            "BTC";
          var btcNode = document.createElement("p");
          btcNode.append(eur_to_btc);
          document.getElementById("eurbtc").appendChild(btcNode);
        })
        .catch(function(error) {
          var node = document.createElement("LI");
          node.id = "currency";
          var text = document.createTextNode(
            "Sorry something went wrong while getting the currency value data :*("
          );
          node.append(text);
          document.getElementById("eurbtc").appendChild(node);

          console.log("error");
        });
      axios
        .get(
          "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=GBP&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var eur_to_sterling =
            "1 Euro = " +
            res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] +
            "GBP";
          var sterlingNode = document.createElement("p");
          sterlingNode.append(eur_to_sterling);
          document.getElementById("eursterling").appendChild(sterlingNode);
        })
        .catch(function(error) {
          var node = document.createElement("LI");
          node.id = "currency";
          var text = document.createTextNode(
            "Sorry something went wrong while getting the currency value data :*("
          );
          node.append(text);
          document.getElementById("eursterling").appendChild(node);

          console.log("error");
        });
      axios
        .get(
          "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var eur_to_dollar =
            "1 Euro = " +
            res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] +
            "USD";
          var dollarNode = document.createElement("p");
          dollarNode.append(eur_to_dollar);
          document.getElementById("eurdollar").appendChild(dollarNode);
        })
        .catch(function(error) {
          var node = document.createElement("LI");
          node.id = "currency";
          var text = document.createTextNode(
            "Sorry something went wrong while getting the currency value data :*("
          );
          node.append(text);
          document.getElementById("eurdollar").appendChild(node);

          console.log("error");
        });
      axios
        .get(
          "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=CNY&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var eur_to_cny =
            "1 Euro = " +
            res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] +
            "CNY";
          var cnyNode = document.createElement("p");
          cnyNode.append(eur_to_cny);
          document.getElementById("eurcny").appendChild(cnyNode);
        })
        .catch(function(error) {
          var node = document.createElement("LI");
          node.id = "currency";
          var text = document.createTextNode(
            "Sorry something went wrong while getting the currency value data :*("
          );
          node.append(text);
          document.getElementById("stock").appendChild(node);

          console.log("error");
        });
    } catch (error) {
      alert("MAX API CALLS FOR FINANCIAL DATA REACHED");
    }
  }
  render() {
    return (
      <div className="Statistics">
        <Helmet>
          <title>Statistics</title>
        </Helmet>
        <h1>Welcome to the Statistics!</h1>
        <div id="stock" />
        <div id="currency">
          <h3>Daily Exchange Rates</h3>
          <h3 id="eurbtc" />
          <h3 id="eursterling" />
          <h3 id="eurdollar" />
          <h3 id="eurcny" />
        </div>
        <div id="charts">
          <h3>Chart Section</h3>
          <p>Heres some charts we made based on your account activity</p>
          <Bar
            data={loanState}
            options={{
              title: {
                display: true,
                text: "Loans on your account",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
          />
          <Bar
            data={transactionState}
            options={{
              title: {
                display: true,
                text: "Transactions on your account",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Statistics;
