import React from "react";
import { Helmet } from "react-helmet";

//Alpha Vantage API key - G38RVCM1OWLSKALP
const axios = require("axios").default;

class Statistics extends React.Component {
  componentDidMount(){
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo").then(res=>{
      var infoText = document.createTextNode(
        "Information: " + res.data["Meta Data"]["1. Information"] + " Symbol type: " + res.data["Meta Data"]
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
    </div>
  );
}
}

export default Statistics;
