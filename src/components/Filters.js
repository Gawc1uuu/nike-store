import { useState } from "react";
//styles
import styles from "./Filters.module.css";
import filterIcon from "../assets/filters.svg";

export default function Filters({ data, getPrice }) {
  const [clicked, setClicked] = useState(false);
  const [maxPrice, setMaxPrice] = useState(null);
  const clickHandler = (e) => {
    clicked ? setClicked(false) : setClicked(true);
  };

  const priceChangeHandler = (e) => {
    setMaxPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    getPrice(maxPrice);
    setClicked(false);
  };
  return (
    <div className={styles.filters}>
      <span>{data.length} results</span>
      <span>
        {!clicked && (
          <img src={filterIcon} alt="filters img" onClick={clickHandler} />
        )}
        {clicked && (
          <form onSubmit={submitHandler}>
            <label>
              <span className={styles["price-label"]}>Max Price</span>
              <input
                className={styles["range-input"]}
                value={maxPrice}
                type="range"
                min="0"
                max="500"
                step="5"
                onChange={priceChangeHandler}
              />
              <input
                readOnly={true}
                className={styles["number-input"]}
                type="number"
                defaultValue="300"
                min="0"
                max="500"
                step="1"
                value={maxPrice}
              />
            </label>
            <button>Filter</button>
          </form>
        )}
      </span>
    </div>
  );
}
