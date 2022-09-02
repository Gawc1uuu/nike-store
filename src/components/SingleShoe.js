import { useState, useContext } from "react";

import "react-toastify/dist/ReactToastify.css";

//styles
import styles from "./SingleShoe.module.css";
import addIcon from "../assets/addToCart.svg";
import { CartContext } from "../context/CartContext";

export default function SingleShoe({ shoe }) {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    clicked ? setClicked(false) : setClicked(true);
  };

  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={`${clicked ? styles["overlay-active"] : styles.overlay}`}>
        <img
          alt="add"
          onClick={() => addToCart(shoe)}
          className={styles.addIcon}
          src={addIcon}
        />
      </div>

      <div className={styles.singleShoe}>
        <img
          alt="shoe img"
          src={
            shoe.media.thumbUrl
              ? shoe.media.thumbUrl
              : "https://images.stockx.com/images/Air-Jordan-7-Retro-Cardinal-2022.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1659807271"
          }
        />
        <div className={styles.caption}>
          <div className={styles.text}>
            <span className={styles.brand}>{shoe.brand}</span>
            <span className={styles.name}>{shoe.name.substring(0, 18)}</span>
          </div>
          <span className={styles.price}>${shoe.retailPrice}</span>
        </div>
      </div>
    </div>
  );
}
