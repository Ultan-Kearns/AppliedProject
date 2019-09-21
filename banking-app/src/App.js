import React from "react";
import Nav from "./Components/Nav";
import "./Components/nav.css";
import "./App.css";
function App() {
  return (
    <div className="App">
      {/*Show the navigation component on homepage*/}
        <Nav className="nav"/>
    </div>
  );
}

export default App;
