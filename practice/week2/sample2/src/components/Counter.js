import React from "react";
import styles from "../styles/counter.module.css";

export default function Counter({ count, handleReset, handleIncrease }) {
  return (
    <div className={styles.wrapper}>
      <p>Current Visitors: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
