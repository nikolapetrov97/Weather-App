import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Toast from "./components/Toast/Toast";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline enableColorScheme />
        <ToastContainer />
        <Toast>
          <AppWrapper>
            <App />
          </AppWrapper>
        </Toast>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
