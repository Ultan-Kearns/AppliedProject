import React from "react";
import { Helmet } from "react-helmet";

//Alpha Vantage API key - G38RVCM1OWLSKALP
const axios = require("axios").default;

class Statistics extends React.Component {
  componentDidMount(){
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo").then(res=>{
      var infoText = document.createTextNode(
        "Daily Time Series: " + res.data["Meta Data"]["1. Information"] + " Symbol type: " + res.data["Meta Data"]
        ["2. Symbol"] + " Last Updated: " + res.data["Meta Data"]["3. Last Refreshed"] + " Time Zone " + res.data["Meta Data"]["5. Time Zone"]
      )

      var d = res.data["Meta Data"]["3. Last Refreshed"]
      var node = document.createElement("LI");
      node.id = "stockresults";
      var text = document.createTextNode(
          "Stats for today: Open: " + res.data["Time Series (Daily)"][d]["1. open"] + " High: " +
          res.data["Time Series (Daily)"]["2020-02-11"]["2. high"] + " Low: " +   res.data["Time Series (Daily)"]["2020-02-11"]["3. low"] +
          " Close: " + res.data["Time Series (Daily)"]["2020-02-11"]["4. close"] + " Volume: " +res.data["Time Series (Daily)"]["2020-02-11"]["5. volume"]
      );
      console.log("TEST " + res.data["Time Series (Daily)"])
      var info = document.createElement("p");
      info.append(infoText)
      node.append(text)
      document.getElementById("stock").appendChild(node);
      document.getElementById("information").appendChild(info);
    })
    axios.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=G38RVCM1OWLSKALP").then(res=>{
      var eur_to_btc = "1 Euro = " + res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] + "BTC"
      var btcNode = document.createElement("p")
      btcNode.append(eur_to_btc)
      document.getElementById("eurbtc").appendChild(btcNode)
})
axios.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=EUR&apikey=G38RVCM1OWLSKALP").then(res=>{
  var eur_to_sterling = "1 Euro = " + res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] + "GBP"
  var sterlingNode = document.createElement("p")
  sterlingNode.append(eur_to_sterling)
  document.getElementById("eursterling").appendChild(sterlingNode)
})
axios.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=G38RVCM1OWLSKALP").then(res=>{
  var eur_to_dollar = "1 Euro = " + res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] + "USD"
  var dollarNode = document.createElement("p")
  dollarNode.append(eur_to_dollar)
  document.getElementById("eurdollar").appendChild(dollarNode)
})
  }
  render(){
  return (
    <div className="Statistics">
      <Helmet>
        <title>Statistics</title>
      </Helmet>
      <h1>Welcome to the Statistics!</h1>
      <h2 id = "information"></h2>
      <div id = "stock">
      </div>
      <div id = "currency">
      <h3>Daily Exchange Rates</h3>
      <h3 id = "eurbtc"></h3>
      <h3 id = "eursterling"></h3>
      <h3 id = "eurdollar"></h3>
      <h3 id = "eurjpy"></h3>

      </div>
    </div>
  );
}
}

export default Statistics;
