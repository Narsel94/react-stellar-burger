import React from "react";
import PropTypes from 'prop-types'; 
import ReactDOM from "react-dom";
import styles from "./overlay.module.css";

const modalRoot = document.getElementById("react-modal");

export function Overlay({setIsModalOpen}) {

Overlay.propTypes = {
  setIsModalOpen: PropTypes.func
}

const onClick = () => {
  setIsModalOpen(false)
}




return ReactDOM.createPortal(
  ( 
    <div className={styles.overlay} onClick={onClick}>
    </div>
   ), modalRoot
  );
}
