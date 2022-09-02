import { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
//styles
import "./Navbar.css";
import nike from "../../src/assets/nike.svg";
import bag from "../../src/assets/bag-icon.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [cartIsHighlighted, setCartIsHighlighted] = useState(false);

  const handleClick = (e) => {
    clicked ? setClicked(false) : setClicked(true);
  };

  const { state, openCart } = useContext(CartContext);

  useEffect(() => {
    if (state.items.length === 0) {
      return;
    }
    setCartIsHighlighted(true);

    const timer = setTimeout(() => {
      setCartIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [state.items]);

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={nike} alt="logo" />
          </Link>
        </li>
        <div className={clicked ? "links active" : "links"}>
          <li>
            <NavLink to="/all">All</NavLink>
          </li>
          <li>
            <NavLink to="men">Men</NavLink>
          </li>
          <li>
            <NavLink to="/women">Women</NavLink>
          </li>
          <li>
            <NavLink to="/kids">Kids</NavLink>
          </li>
        </div>
        <li className="cart" onClick={() => openCart()}>
          <img src={bag} alt="cart" />
          <div className={`counter ${cartIsHighlighted ? "bump" : ""}`}>
            {state.items.length}
          </div>
        </li>
      </ul>
      <div className="menu-icon" onClick={handleClick}>
        {clicked && <img className="menuIcon" src={close} alt="close icon" />}
        {!clicked && <img className="menuIcon" src={menu} alt="menu icon" />}
      </div>
    </nav>
  );
}
