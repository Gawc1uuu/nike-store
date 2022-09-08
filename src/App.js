import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import All from "./pages/all/All";
import Men from "./pages/men/Men";
import Women from "./pages/women/Women";
import Kids from "./pages/kids/Kids";
import Error from "./pages/error/Error";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

//styles
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart/Cart";
import { CartContext } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { state } = useContext(CartContext);

  return (
    <div className="App">
      <ToastContainer />
      {state.isOpen && <Cart />}
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/all">
            <All />
          </Route>
          <Route path="/men">
            <Men />
          </Route>
          <Route path="/women">
            <Women />
          </Route>
          <Route path="/kids">
            <Kids />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
