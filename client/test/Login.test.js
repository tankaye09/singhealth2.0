import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
import Login from "../src/components/auth/Login";
var jsdom = require("mocha-jsdom");
global.document = jsdom({
  url: "http://localhost:3000/login",
});

let rootContainer;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe("Login Component Testing", () => {
  it("Renders Wlecome to SingHealth Audit title", () => {
    act(() => {
      ReactDOM.render(Login, rootContainer);
    });
    const h2 = rootContainer.querySelector("h2");
    expect(h2.textContent).to.equal("Welcome to SingHealth Audit");
  });
});
