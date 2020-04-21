import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import "axios";
import Home from "./Components/Home";
import About from "./Components/About";
import Loans from "./Components/Loans";
import Headlines from "./Components/Headlines";
import Transactions from "./Components/Transactions";
import Statistics from "./Components/Statistics";
import Support from "./Components/Support";
import UserInfo from "./Components/UserInfo";
import Error from "./Components/Error";
import Nav from "./Components/Nav";

const annyang = require("annyang");


class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    //this stops context menu being used in app
    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });

    //template taken from example https://www.npmjs.com/package/annyang
    if (annyang) {
      // Commands
      var commands = {


        hello: function() {
          alert("Hi Friend, I am dectecting your voice :D!");
        },
        home: function() {
          ReactDOM.render(<Home />,document.getElementById("root"))
        },
        about: function() {
          ReactDOM.render(<About />,document.getElementById("root"));

        },
        headlines: function() {
          ReactDOM.render(<Headlines />,document.getElementById("root"));

        },
        loans: function() {
          ReactDOM.render(<Loans />,document.getElementById("root"));

        },
        transactions: function() {
          ReactDOM.render(<Transactions />,document.getElementById("root"));

        },
        statistics: function() {
          ReactDOM.render(<Statistics />,document.getElementById("root"));
        },
        information: function() {
          ReactDOM.render(<UserInfo />,document.getElementById("root"));

        },
        support: function() {
          ReactDOM.render(<Support />,document.getElementById("root"));

        },
        logout: function() {
          sessionStorage.setItem("username", "");
          window.location.reload();
        },
        help: function(){
          alert("You are now in voice mode, you can navigate pages using your voice\n"+
          "valid pages are:\n" +
          "home\n" +
          "about\n" +
          "headlines\n" +
          "loans\n" +
          "transactions\n" +
          "statistics\n" +
          "information\n" +
          "and support\n" +
          "If you wish to logout just say logout\n" +
          "If you wish to exit voice mode please logout and login again");
        }

      };
      // Add commands to annyang
      annyang.addCommands(commands);

      // Starts listening.
      annyang.start();
    }
  }
  render(){
    return(
      <div>

      </div>
    )
  }
}
export default App;
