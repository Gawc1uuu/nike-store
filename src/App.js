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
import { useFetch } from "./hooks/useFetch";

function App() {
  const { state, ToastContainer } = useContext(CartContext);
  //https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20
  const { data, isPending, error } = useFetch(
    "https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20"
  );

  const allShoes = data.filter((item) => {
    if (item.retailPrice && item.media.thumbUrl) {
      return item;
    } else return false;
  });

  const shoesArr = allShoes.map((item) => ({ ...item, qty: 0 }));

  return (
    <div className="App">
      {state.isOpen && <Cart />}
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/all">
            <All data={shoesArr} isPending={isPending} error={error} />
          </Route>
          <Route path="/men">
            <Men data={shoesArr} isPending={isPending} error={error} />
          </Route>
          <Route path="/women">
            <Women data={shoesArr} isPending={isPending} error={error} />
          </Route>
          <Route path="/kids">
            <Kids data={shoesArr} isPending={isPending} error={error} />
          </Route>
          <Route path="/error">
            <Error error={error} />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
