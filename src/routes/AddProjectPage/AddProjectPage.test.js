import React from "react";
import ReactDOM from "react-dom";
import AddProjectPage from "./AddProjectPage";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddProjectPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
