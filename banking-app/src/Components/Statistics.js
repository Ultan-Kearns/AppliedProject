import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/StatStyle.css";
import { Bar } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

//Alpha Vantage API key - G38RVCM1OWLSKALP
const axios = require("axios").default;

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //change this to get labels of dates from loans /transactions
      loanState: {
        type: "bar",
        labels: [],
        datasets: [
          {
            label: "Loan Amount",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
          }
        ],
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                min: 0
              }
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      },
      transactionState: {
        type: "bar",
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
          xAxes: [
            {
              display: false,
              ticks: {
                min: 0
              }
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    };
  }
  componentDidMount() {
    //this is for getting daily conversion rates and stock info
    try {
      //issue not returning promise
      this.updateTransactionData();
      this.updateLoanData();
      axios
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=G38RVCM1OWLSKALP"
        )
        .then(res => {
          var d = res.data["Meta Data"]["3. Last Refreshed"];
          d = d.split(" ")[0];
          var node = document.createElement("LI");
          node.id = "stockresults";
          var openText = document.createTextNode(
            "Open: " +
              res.data["Time Series (Daily)"][d]["1. open"]
          );
          var highText = document.createTextNode(
            " High: " + res.data["Time Series (Daily)"][d]["2. high"]
          );
          var lowText = document.createTextNode(
            " Low: " + res.data["Time Series (Daily)"][d]["3. low"]
          );
          var closeText = document.createTextNode(
            " Close: " + res.data["Time Series (Daily)"][d]["4. close"]
          );
          var volumeText = document.createTextNode(
            " Volume: " + res.data["Time Series (Daily)"][d]["5. volume"]
          );
          var br = document.createElement("BR");
          node.append(br);
          node.append(openText);
          node.append(br.cloneNode());
          node.append(highText);
          node.append(br.cloneNode());
          node.append(lowText);
          node.append(br.cloneNode());
          node.append(closeText);
          node.append(br.cloneNode());
          node.append(volumeText);
          document.getElementById("stock").appendChild(node);
        })
        .catch(error => {
          alert("problem getting currency data");
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
          alert(
            "Issue retrieving data most likely you have probably maxed out API calls" +
              error
          );
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
        .catch(function(error) {});
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
        .catch(function(error) {});
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
        .catch(error => {});
    } catch (error) {
      alert("MAX API CALLS FOR FINANCIAL DATA REACHED");
    }
  }
  async updateLoanData() {
    await axios
      .get(
        "https://34.68.75.97:8080/api/loans/" + sessionStorage.getItem("email")
      )
      .then(res => {
        console.log(res.data);
        var newLoanState = this.state.loanState;
        for (var i = 0; i < res.data.length; i++) {
          newLoanState.datasets[0].data[i] = res.data[i].amount;
          newLoanState.labels[i] = res.data[i].amount;
        }
        this.setState({
          loanState: newLoanState
        });
      })
      .catch(function(error) {
        alert("Error generating loans " + error);
      });
  }
  async updateTransactionData() {
    return axios
      .get(
        "https://34.68.75.97:8080/api/transactions/" +
          sessionStorage.getItem("email")
      )
      .then(res => {
        var newTransactionState = this.state.transactionState;
        for (var i = 0; i < res.data.length; i++) {
          newTransactionState.datasets[0].data[i] = res.data[i].cost;
          newTransactionState.labels[i] = res.data[i].location;
        }
        this.setState({
          transactionState: newTransactionState
        });
      })
      .catch(function(error) {
        alert("Error generating transactions " + error);
      });
  }
  render() {
    return (
      <div className="Statistics">
      <h1>Daily Statistics</h1>
        <Helmet>
          <title>Statistics</title>
        </Helmet>
        <Card>
          <Card.Header>
            Welcome to the Statistics Page {sessionStorage.getItem("username")}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              On the statistics page I will get the daily conversion rates for
              the day and also get information on the stock market, we will also
              generate charts based on your spending.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Closing info for stock market</Card.Header>
          <Card.Body>
            <Card.Text id="stock" />
          </Card.Body>
        </Card>
        <div id="currency">
          <Card>
            <Card.Header>Daily Exchange Rates</Card.Header>
            <Card.Body>
              <h3 id="eurbtc"> </h3>
              <h3 id="eursterling"> </h3>
              <h3 id="eurdollar"> </h3>
              <h3 id="eurcny"> </h3>
            </Card.Body>
          </Card>
        </div>
        <div id="charts">
          <p />
          <Card>
            <Card.Header>Chart Section</Card.Header>
            <Card.Body>
              <Card.Text>
                Here's some charts we made based on your account activity in
                regards to loans and transactions
              </Card.Text>
              <Bar
                id="loanChart"
                data={this.state.loanState}
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
                data={this.state.transactionState}
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
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Statistics;
