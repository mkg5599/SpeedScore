import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoundsListing from "./screens/RoundsListing";
import reportWebVitals from "./reportWebVitals";
import RoundsContextProvider from "./context/RoundsContext";

const root = ReactDOM.createRoot(document.getElementById("roundsModule"));
root.render(
  <React.StrictMode>
    <RoundsContextProvider>
      <RoundsListing />
    </RoundsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
