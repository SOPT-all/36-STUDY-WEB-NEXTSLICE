import React, { useEffect, useState } from "react";
import Link from "next/link";
import Counter from "../components/Counter";
import styles from "../styles/home.module.css";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count);
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
      <h2>Visit the Blog</h2>
      <ul>
        <li>
          <Link href="/blog/hello-nextjs">Hello Next.js</Link>
        </li>
        <li>
          <Link href="/blog/learn-routing">Learning Routing</Link>
        </li>
        <li>
          <Link href="/blog/next-image">Next.js Image</Link>
        </li>
        <li>
          <Link href="/blog/static-props">Static Props</Link>
        </li>
        <li>
          <Link href="/blog/api-routes">Api Routes</Link>
        </li>
        <li>
          <Link href="/blog/css-modules">CSS Modules</Link>
        </li>
      </ul>
    </div>
  );
}
