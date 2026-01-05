import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { handleInitialLoad } from "./store/shared.action";
import App from "./App";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(handleInitialLoad());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
