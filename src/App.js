/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/404";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import "./App.css";

const App = () => {
  let routes = (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/404" component={NotFound} />
        <Main />
      </Switch>
    </>
  );
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>{routes}</div>
    </BrowserRouter>
  );
};

export default App;
