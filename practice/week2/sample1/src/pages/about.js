import React from "react";
import styles from "../styles/about.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Page</h1>
      <p className={styles.desc}>
        This is a blog application using Next.js. You can manage visitor count
        and read articles.
      </p>
    </div>
  );
}
