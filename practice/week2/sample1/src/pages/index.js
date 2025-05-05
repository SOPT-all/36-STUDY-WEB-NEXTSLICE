import React, { useEffect, useState } from "react";
import Link from "next/link";
import Counter from "../components/Counter";
import styles from "../styles/home.module.css";

export default function Home() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    } else {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    if (count !== null) localStorage.setItem("count", count);
  }, [count]);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <p>Welcome to the blog</p>
      <Counter
        count={count}
        handleIncrease={handleIncrease}
        handleReset={handleReset}
      />
      <Link href="/about">Go to About Page</Link>
    </div>
  );
}
