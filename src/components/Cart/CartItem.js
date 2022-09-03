import React, { useContext, useState } from "react";
import styles from "./CartItem.module.css";
import deleteIcon from "../../assets/delete.svg";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartItem({ data }) {
  const [itemQty, setItemQty] = useState(data.qty);
  const { deleteItem, onInc, onDec } = useContext(CartContext);

  const notifyAdd = () =>
    toast.info("Quantity increased!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyDelete = () =>
    toast.info("Quantity decreased", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onMinus = (id) => {
    if (itemQty > 1) {
      setItemQty((prevState) => prevState - 1);
      onDec(id);
      notifyDelete();
    }
  };
  const onPlus = (id) => {
    if (itemQty >= 1) {
      setItemQty((prevState) => prevState + 1);
      onInc(id);
      notifyAdd();
    }
  };

  return (
    <div className={styles.item}>
      <img
        alt="shoe"
        className={styles.shoeImg}
        src={
          data.media.thumbUrl
            ? data.media.thumbUrl
            : "https://images.stockx.com/images/Air-Jordan-7-Retro-Cardinal-2022.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1659807271"
        }
      />
      <p className={styles.title}>{data.title.substring(0, 20)}...</p>
      <p className={styles.price}>${data.retailPrice * data.qty}</p>
      <button onClick={() => onMinus(data.id)}>-</button>
      <p>{itemQty}</p>
      <button onClick={() => onPlus(data.id)}>+</button>
      <img
        onClick={() => deleteItem(data)}
        className={styles.deleteIcon}
        src={deleteIcon}
        alt="deleteicon"
      />
    </div>
  );
}
