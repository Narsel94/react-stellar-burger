import React from "react"; 
import styles from "./section.module.css";
import PropTypes from 'prop-types'; 

export default function Section(props) {
  
  Section.propTypes ={
    props: PropTypes.node
  }
  
  return (
    <section className={styles.section}>
        {props.children}
    </section>
  )
}