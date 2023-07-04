import React from "react"; 
import styles from "./section.module.css";


export default function Section(props) {
  return (
    <section className={styles.section}>
        {props.children}
    </section>
  )
}