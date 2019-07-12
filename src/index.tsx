import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Food } from "./pages/food";
import store from "./store";
import { Provider } from "react-redux";
import "./styles/index.css";

render(
  <Provider store={store}>
    <Food />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
