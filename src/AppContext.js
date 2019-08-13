import React from "react";

const AppContext = React.createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {}
});

export default AppContext;
