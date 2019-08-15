import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "../../AppContext";
import Header from "../Header/Header";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import AddProjectPage from "../../routes/AddProjectPage/AddProjectPage";
import EditProjectPage from "../../routes/EditProjectPage/EditProjectPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

class App extends Component {
  state = {
    loggedIn: false,
    user: {}
  };

  async componentDidMount() {
    // check if user is currently logged in, and if so, call setUser function to store user credentials
    await this.setState({
      loggedIn: TokenService.hasAuthToken()
    });

    if (this.state.loggedIn) {
      const jwtPayload = TokenService.parseAuthToken();
      await this.setUser({
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub
      });
    }

    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
      tell the idle service to register event listeners
      the event listeners are fired when a user does something, e.g. move their mouse
      if the user doesn't trigger one of these event listeners,
        the idleCallback (logout) will be invoked
    */
      IdleService.regiserIdleTimerResets();

      /*
      Tell the token service to read the JWT, looking at the exp value
      and queue a timeout just before the token expires
    */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
    when the app unmounts,
    stop the event listeners that auto logout (clear the token from storage)
  */
    IdleService.unRegisterIdleResets();
    /*
    and remove the refresh endpoint request
  */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
    react won't know the token has been removed from local storage,
    so we need to tell React to rerender
  */
    this.setState({
      loggedIn: false
    });
  };

  // check if user is logged in and update state accordingly
  setLoggedIn = () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
  };

  // store user credentials in state
  setUser = user => {
    this.setState({
      user
    });
  };

  render() {
    const contextValue = {
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn,
      user: this.state.user,
      setUser: this.setUser
    };

    return (
      <AppContext.Provider value={contextValue}>
        <header>
          <Header />
        </header>
        <main className="App" role="main">
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <PrivateRoute path={"/dashboard"} component={Dashboard} />
            <PrivateRoute
              path={"/edit-project/:project_id"}
              component={EditProjectPage}
            />
            <PrivateRoute path={"/add-project"} component={AddProjectPage} />
            <PublicOnlyRoute path={"/login"} component={LoginPage} />
            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </AppContext.Provider>
    );
  }
}

export default App;
