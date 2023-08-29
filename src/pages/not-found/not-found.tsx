import React from "react";
import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.shadow} text_type_digits-large`}>404</h1>
      <h2 className={`${styles.shadow} text text_type_main-large`}>
        Страница не найдена
      </h2>
      <Link to="/" className={`${styles.link} text_type_main-medium mt-8`}>
        На главную
      </Link>
    </div>
  );
}
