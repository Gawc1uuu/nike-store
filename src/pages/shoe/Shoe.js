import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SingleShoeContext } from "../../context/SingleShoeContext";

import styles from "./Shoe.module.css";

export default function Shoe() {
  const { singleShoe } = useContext(SingleShoeContext);
  // const { id } = useParams();

  // useEffect(() => {
  //   if (data) {
  //     const shoe = data.find((item) => item.id === id);
  //     setSingleShoe({ ...shoe });
  //   }
  // }, [id, data]);

  console.log(singleShoe);

  return (
    <div>
      <Header>Shoe</Header>
      <div className={styles.shoe}>
        <h1 className={styles.details}>
          {singleShoe.brand}-{singleShoe.colorway}.<br />
          <span className={styles.price}>${singleShoe.retailPrice}</span>
        </h1>
        <div>
          <img
            alt="shoe img"
            src={
              singleShoe.media.smallImageUrl
                ? singleShoe.media.smallImageUrl
                : "https://images.stockx.com/images/Air-Jordan-12-Retro-Black-Taxi.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1659807213"
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
