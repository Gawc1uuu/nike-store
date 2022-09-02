import React from "react";
import Footer from "../../components/Footer";
import errorImg from "../../assets/error.jpg";
//styles
import styles from "./Error.module.css";
export default function Error({ error }) {
  return (
    <div>
      <div className={styles.errorPage}>
        <img alt="error img" src={errorImg} />
      </div>
      <Footer />
    </div>
  );
}
