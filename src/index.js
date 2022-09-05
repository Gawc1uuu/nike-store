import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "./context/CartContext";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const { ToastContainer } = useContext(CartContext);
root.render(
  <CartContextProvider>
    <App />
    <ToastContainer />
  </CartContextProvider>
);
