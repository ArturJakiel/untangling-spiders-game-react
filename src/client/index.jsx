import React from "react";
import ReactDOM from "react-dom";

import "./style/app.css";

import App from "./App";
import AppStatusProvider from "./provider/gameStatus";

ReactDOM.render(
  <React.StrictMode>
    <AppStatusProvider>
      <App />
    </AppStatusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
