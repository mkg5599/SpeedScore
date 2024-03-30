import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoundsListing from "./screens/RoundsListing";
import RoundsContextProvider from "./context/RoundsContext";

const root = ReactDOM.createRoot(document.getElementById("roundsModule"));
root.render(
  <React.StrictMode>
    <RoundsContextProvider>
      <RoundsListing />
    </RoundsContextProvider>
  </React.StrictMode>
);
