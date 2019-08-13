import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "../../AppContext";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import STORE from "../../STORE";

class App extends Component {
  state = {
    user: {},
    skills: []
  };

  componentDidMount() {
    let { user, skills } = STORE;
    this.setState({
      user,
      skills
    });
  }

  render() {
    const contextValue = {
      user: this.state.user
    };

    return (
      <AppContext.Provider value={contextValue}>
        <main className="App" role="main">
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Route exact path={"/dashboard"} component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </AppContext.Provider>
    );
  }
}

export default App;
