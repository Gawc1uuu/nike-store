import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/CartContext";
import { SingleShoeContextProvider } from "./context/SingleShoeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <SingleShoeContextProvider>
      <App />
    </SingleShoeContextProvider>
  </CartContextProvider>
);
