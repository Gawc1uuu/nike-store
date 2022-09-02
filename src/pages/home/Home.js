import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

//styles
import styles from "./Home.module.css";
import airjordan from "../../assets/jordan1.jpg";
import airforce from "../../assets/airforce1.jpg";
import nikeGreen from "../../assets/nike-green.jpg";
import af1High from "../../assets/af1High.jpg";

export default function Home() {
  return (
    <div>
      <div className={styles.homePage}>
        <div className={styles.text}>
          <span>RUN THE WORLD</span>
          <span>WITH US</span>
          <button className={styles.shopBtn}>
            <Link to="/all">Shop now</Link>
          </button>
        </div>
      </div>
      <div className={styles.collection}>
        <h2>Recenlty dropped</h2>
        <div className={styles.firstRow}>
          <img src={airjordan} alt="shoe example" />
          <img src={airforce} alt="shoe example" />
        </div>
        <div className={styles.secondRow}>
          <img src={nikeGreen} alt="shoe example" />
          <img src={af1High} alt="shoe example" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
