/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
