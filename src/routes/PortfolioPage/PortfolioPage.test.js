import React from "react";
import ReactDOM from "react-dom";
import PortfolioPage from "./PortfolioPage";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    }
  };

  ReactDOM.render(
    <BrowserRouter>
      <PortfolioPage {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
