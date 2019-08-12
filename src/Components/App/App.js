import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

class App extends Component {
  render() {
    return (
      <main className="App" role="main">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    );
  }
}

export default App;
