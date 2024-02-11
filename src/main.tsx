import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FluentProvider theme={teamsLightTheme}>
          <App />
        </FluentProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
