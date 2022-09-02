import { Fragment } from "react";
import SingleShoe from "./SingleShoe";
//styles
import styles from "./ShoesList.module.css";

export default function ShoesList({ data }) {
  return (
    <Fragment>
      <div className={styles.shoesList}>
        {data.map((shoe) => (
          <SingleShoe key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </Fragment>
  );
}
