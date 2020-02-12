import React from "react";
import { Helmet } from "react-helmet";

//Alpha Vantage API key - G38RVCM1OWLSKALP
const axios = require("axios").default;

class Statistics extends React.Component {
  componentDidMount() {
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
      )
      .then(res => {
        var d = res.data["Meta Data"]["3. Last Refreshed"];
        var node = document.createElement("LI");
        node.id = "stockresults";
        var text = document.createTextNode(
          "Stats for today: Open: " +
            res.data["Time Series (Daily)"][d]["1. open"] +
            " High: " +
            res.data["Time Series (Daily)"]["2020-02-11"]["2. high"] +
            " Low: " +
            res.data["Time Series (Daily)"]["2020-02-11"]["3. low"] +
            " Close: " +
            res.data["Time Series (Daily)"]["2020-02-11"]["4. close"] +
            " Volume: " +
            res.data["Time Series (Daily)"]["2020-02-11"]["5. volume"]
        );
        console.log("TEST " + res.data["Time Series (Daily)"]);
        node.append(text);
        document.getElementById("stock").appendChild(node);
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
      });
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
      </div>
    );
  }
}

export default Statistics;
