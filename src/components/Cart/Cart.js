import React, { useContext, useState, useEffect } from "react";
import emptyCart from "../../assets/empty-cart.svg";

//styles
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Cart.module.css";
import closeIcon from "../../assets/close.svg";
import { CartContext } from "../../context/CartContext";
import { ClockLoader } from "react-spinners";
import checkMark from "../../assets/check.svg";
import deleteIcon from "../../assets/delete.svg";

export default function Cart() {
  const [isAuth, setIsAuth] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const { state, closeCart } = useContext(CartContext);
  let total = 0;

  const [itemQty, setItemQty] = useState(1);

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

  const submitHandler = (e) => {
    e.preventDefault();
    onPlaceOrderHandler();
  };

  const onPlaceOrderHandler = () => {
    setIsAuth(false);
    setIsOrdered(true);
    setLoading(true);
  };

  const onOrderHandler = () => {
    // setIsOrdered(true);
    // setLoading(true);
    setIsAuth(true);
  };

  useEffect(() => {
    if (isOrdered) {
      const timer1 = setTimeout(() => {
        setIsOrdered(false);
        setLoading(false);
        setOrderDone(true);
      }, 3000);
      setTimeout(() => {
        setOrderDone(false);
        closeCart();
        state.items = [];
      }, 5000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [isOrdered, setLoading, closeCart, state]);
  // useEffect(() => {

  // }, [orderDone]);

  if (isOrdered) {
    return (
      <React.Fragment>
        <div className={styles.overlay}></div>
        <div className={styles.modalLoading}>
          <ClockLoader color={"#000000"} loading={loading} size={100} />
          <h2>Completing your order!</h2>
        </div>
      </React.Fragment>
    );
  }

  if (orderDone) {
    return (
      <React.Fragment>
        <div className={styles.overlay}></div>
        <div className={styles.modalOrdered}>
          <img src={checkMark} alt="checkmark" />
          <h2>Order completed!</h2>
        </div>
      </React.Fragment>
    );
  }

  if (isAuth) {
    state.items.length !== 0 &&
      state.items.map((item) => {
        return (total += item.retailPrice * item.qty);
      });
    return (
      <React.Fragment>
        <div className={styles.overlay}></div>
        <div className={styles.modal}>
          <form onSubmit={submitHandler} className={styles.orderFrom}>
            <div className={styles.formInputs}>
              <label>
                <span>First Name:</span>
                <input type="text" placeholder="First Name" required />
              </label>
              <label>
                <span>Last Name:</span>
                <input type="text" placeholder="Last Name" required />
              </label>
              <label>
                <span>E-mail:</span>
                <input type="email" placeholder="E-mail" required />
              </label>
              <label>
                <span>Country:</span>
                <input type="text" placeholder="Country" required />
              </label>
              <label>
                <span>City:</span>
                <input type="text" placeholder="City" required />
              </label>
              <label>
                <span>Post Code:</span>
                <input type="text" placeholder="Post Code" required />
              </label>
              <label>
                <span>Street Name:</span>
                <input type="text" placeholder="Street Name" required />
              </label>
            </div>
            <div className={styles.summary}>
              <div>
                <p>Total: ${total}</p>
              </div>
              <div>
                <button>Order</button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <img
          onClick={() => closeCart()}
          src={closeIcon}
          className={styles.close}
          alt="close icon"
        />
        <div className={styles.items}>
          {state.items.length !== 0 &&
            state.items.map((item) => {
              total += item.retailPrice * item.qty;
              setItemQty(item.qty);
              return (
                <div className={styles["cart-item"]}>
                  <img
                    alt="shoe"
                    className={styles.shoeImg}
                    src={
                      item.media.thumbUrl
                        ? item.media.thumbUrl
                        : "https://images.stockx.com/images/Air-Jordan-7-Retro-Cardinal-2022.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1659807271"
                    }
                  />
                  <p className={styles.title}>
                    {item.title.substring(0, 20)}...
                  </p>
                  <p className={styles.price}>${item.retailPrice * item.qty}</p>
                  <button onClick={() => onMinus(item.id)}>-</button>
                  <p>{itemQty}</p>
                  <button onClick={() => onPlus(item.id)}>+</button>
                  <img
                    onClick={() => deleteItem(item)}
                    className={styles.deleteIcon}
                    src={deleteIcon}
                    alt="deleteicon"
                  />
                </div>
              );
            })}

          {state.items.length === 0 && (
            <div className={styles.emptyCart}>
              <img src={emptyCart} alt="empty cart" />
              <h3>Your cart is empty!</h3>
            </div>
          )}
        </div>
        {state.items.length !== 0 && (
          <div className={styles.summary}>
            <div>
              <p>Total: ${total}</p>
            </div>
            <div>
              <button onClick={onOrderHandler}>Check Out</button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
